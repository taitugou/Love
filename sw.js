const CACHE_NAME = 'love-site-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './diary.html',
  './manifest.json',
  './md/1.md',
  './md/2.md',
  './md/3.md',
  './md/4.md',
  './md/5.md',
  './md/6.md',
  './md/7.md',
  './md/8.md',
  './md/9.md',
  './md/10.md',
  './md/11.md',
  './md/12.md',
  './md/13.md',
  './md/14.md',
  './md/15.md',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js'
];

// 安装时缓存所有资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 拦截请求：Stale-while-revalidate 策略
// 优先使用缓存，同时后台请求更新
self.addEventListener('fetch', (event) => {
  // 排除 supabase 实时请求或非 GET 请求
  if (event.request.method !== 'GET' || event.request.url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // 如果请求成功，更新缓存
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // 如果联网失败，cachedResponse 已经是最后的救命稻草
        });

        // 返回缓存（如果有），否则等待网络
        return cachedResponse || fetchPromise;
      });
    })
  );
});
