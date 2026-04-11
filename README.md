# Love

一个记录思念的浪漫网站 🌹

## 功能特性

- 💕 实时恋爱计时器
- 📝 每周日记功能
- 💌 留言板功能（使用 JSONBin API）
- 📱 响应式设计，支持移动端
- 🚀 PWA 支持，可离线访问

## 留言板 API 设置

本项目使用 **JSONBin** 作为留言板的后端存储，这是一个完全免费的 JSON 存储服务。

### 快速开始

1. **获取 API Key**
   - 访问 https://jsonbin.io
   - 注册免费账号
   - 在 Dashboard 获取 API Key

2. **配置 diary.html**
   打开 `diary.html`，找到以下配置（约第 157 行）：
   
   ```javascript
   const JSONBIN_CONFIG = {
     API_KEY: 'YOUR_API_KEY_HERE',
     BIN_ID: 'YOUR_BIN_ID_HERE',
     API_URL: 'https://api.jsonbin.io/v3'
   };
   ```
   
   替换为你的实际配置。

3. **测试**
   - 在浏览器中打开 `index.html`
   - 点击 "老婆留言 😘" 按钮
   - 发布一条留言测试

详细设置指南请查看 [API_SETUP.md](./API_SETUP.md)

## 本地运行

直接双击打开 `index.html` 即可，或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server -p 8000
```

然后在浏览器访问 `http://localhost:8000`

## 部署

可以将整个项目部署到任何静态网站托管服务：

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 技术栈

- 纯 HTML/CSS/JavaScript
- JSONBin API（留言板后端）
- Service Worker（离线支持）
- PWA

## 免费额度

JSONBin 免费计划：
- ✅ 每天 100 次请求
- ✅ 每个 Bin 最大 1MB 存储
- ✅ 无限数量的 Bin

对于个人留言板项目完全够用！

## 许可证

MIT License
