const CACHE_NAME = 'love-site-v2';
const CRITICAL_ASSETS = [
  './',
  './index.html',
  './diary.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js'
];

// 非关键资源，即使加载失败也不影响 SW 安装
const NON_CRITICAL_ASSETS = [
  './md/1.md', './md/2.md', './md/3.md', './md/4.md', './md/5.md',
  './md/6.md', './md/7.md', './md/8.md', './md/9.md', './md/10.md',
  './md/11.md', './md/12.md', './md/13.md', './md/14.md', './md/15.md'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: 正在预缓存关键资源');
      // 关键资源必须全部成功
      const criticalPromise = cache.addAll(CRITICAL_ASSETS);
      
      // 非关键资源逐个添加，失败了也没关系
      const nonCriticalPromises = NON_CRITICAL_ASSETS.map(url => {
        return fetch(url).then(response => {
          if (response.ok) return cache.put(url, response);
        }).catch(err => console.warn(`SW: 预缓存非关键资源失败: ${url}`, err));
      });

      return Promise.all([criticalPromise, ...nonCriticalPromises]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: 清理旧缓存', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // 排除非 GET 请求或 Supabase 实时请求
  if (event.request.method !== 'GET' || event.request.url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 即使有缓存，也发起网络请求进行更新 (Stale-while-revalidate)
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.log('SW: 网络请求失败，尝试回退到缓存', err);
        return cachedResponse;
      });

      // 导航请求（页面跳转）如果没有缓存，必须等待网络，否则可能白屏
      if (event.request.mode === 'navigate') {
        return cachedResponse || fetchPromise;
      }

      // 静态资源优先返回缓存
      return cachedResponse || fetchPromise;
    })
  );
});
