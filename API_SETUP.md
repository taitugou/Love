# JSONBin API 设置指南

## 第一步：注册 JSONBin 账号

1. 访问 https://jsonbin.io
2. 点击 "Sign Up" 注册免费账号
3. 登录到 Dashboard

## 第二步：获取 API Key

1. 登录后，点击左上角菜单
2. 选择 "API Keys" 或 "Keys" 选项
3. 复制你的 **X-Master-Key**（API Key）

## 第三步：创建初始 Bin（可选）

有两种方式创建存储留言的 Bin：

### 方法 A：自动创建（推荐）
代码会自动创建一个新的 Bin，你只需要在第一次运行时从控制台日志中获取 Bin ID。

### 方法 B：手动创建
1. 在 Dashboard 点击 "Create Bin"
2. 在编辑器中输入初始数据：`[]`（空数组）
3. 点击保存
4. 复制 Bin ID（在 URL 或 Bin 详情中）

## 第四步：配置 diary.html

打开 `diary.html` 文件，找到第 157-161 行：

```javascript
const JSONBIN_CONFIG = {
  API_KEY: 'YOUR_API_KEY_HERE',  // 替换为你的 API Key
  BIN_ID: 'YOUR_BIN_ID_HERE',    // 替换为你的 Bin ID
  API_URL: 'https://api.jsonbin.io/v3'
};
```

替换为你的实际配置：

```javascript
const JSONBIN_CONFIG = {
  API_KEY: 'sb_publishable_xxxxxxxxxxxxx',  // 你的 API Key
  BIN_ID: '6xxxxxxxxxxxxxxxxxxxxxxx',       // 你的 Bin ID
  API_URL: 'https://api.jsonbin.io/v3'
};
```

## 第五步：测试

1. 在浏览器中打开 `index.html`
2. 点击 "老婆留言 😘" 按钮
3. 尝试发布一条留言
4. 检查控制台日志（F12）确认是否正常

## 免费额度说明

JSONBin 免费计划：
- ✅ 每天 100 次请求
- ✅ 每个 Bin 最大 1MB 存储空间
- ✅ 无限数量的 Bin

对于小型留言板项目，免费额度完全够用！

## 故障排查

### 问题 1：401 Unauthorized
- 检查 API Key 是否正确
- 确认 API Key 没有过期

### 问题 2：404 Not Found
- 检查 Bin ID 是否正确
- 确认 Bin 已经创建

### 问题 3：429 Too Many Requests
- 超出每日请求限制，等待第二天重试
- 考虑升级到付费计划

## 迁移原有数据（如果需要）

如果你想保留 Supabase 中的原有留言数据：

1. 从 Supabase 导出数据为 JSON 格式
2. 将数据格式转换为：
```json
[
  {
    "id": "1234567890",
    "content": "留言内容",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
]
```
3. 在 JSONBin Dashboard 中编辑 Bin，粘贴数据并保存

## 安全提示

⚠️ **重要**：由于这是纯前端项目，API Key 会暴露在客户端代码中。

建议的缓解措施：
1. 使用只读 API Key（如果 JSONBin 支持）
2. 设置 CORS 限制（在 JSONBin 配置中）
3. 考虑使用 CloudFlare Worker 作为中间层（进阶）

对于个人项目或小范围使用，当前方案已经足够安全。
