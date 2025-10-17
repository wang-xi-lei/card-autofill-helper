# 🚀 部署指南

快速将测试卡号生成器部署到各种平台

---

## 📦 部署前准备

确保您有以下文件：
```
web-version/
├── index.html    (主文件)
├── README.md     (说明文档)
└── DEPLOY.md     (本文件)
```

---

## 🌐 部署平台选择

| 平台 | 难度 | 速度 | 费用 | 推荐度 |
|------|------|------|------|--------|
| GitHub Pages | ⭐ | 快 | 免费 | ⭐⭐⭐⭐⭐ |
| Vercel | ⭐ | 极快 | 免费 | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐ | 快 | 免费 | ⭐⭐⭐⭐ |
| Cloudflare Pages | ⭐⭐ | 极快 | 免费 | ⭐⭐⭐⭐ |

---

## 1️⃣ GitHub Pages

### 优点
- ✅ 完全免费
- ✅ 自动HTTPS
- ✅ 与代码仓库集成
- ✅ 稳定可靠

### 部署步骤

#### 方法A：通过仓库设置（推荐）

1. **创建GitHub仓库**
   ```bash
   # 初始化Git仓库
   cd web-version
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到GitHub**
   ```bash
   # 在GitHub创建新仓库后
   git remote add origin https://github.com/YOUR_USERNAME/card-generator.git
   git branch -M main
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库 Settings
   - 找到 "Pages" 选项
   - Source 选择 "main" 分支
   - 点击 Save

4. **访问网站**
   ```
   https://YOUR_USERNAME.github.io/card-generator/
   ```

#### 方法B：通过GitHub Desktop

1. 打开 GitHub Desktop
2. File → Add Local Repository
3. 选择 `web-version` 文件夹
4. Publish repository
5. 在网页端启用 Pages

---

## 2️⃣ Vercel

### 优点
- ✅ 极速部署（<30秒）
- ✅ 全球CDN
- ✅ 自动HTTPS
- ✅ 支持自定义域名

### 部署步骤

#### 方法A：命令行部署（最快）

1. **安装Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   cd web-version
   vercel
   
   # 或一键部署到生产环境
   vercel --prod
   ```

4. **完成！**
   - 会得到一个URL，如：`https://card-generator.vercel.app`

#### 方法B：网页导入（最简单）

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入GitHub仓库
4. 点击 "Deploy"
5. 等待30秒，完成！

#### 方法C：拖拽部署

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 直接拖拽 `web-version` 文件夹
3. 自动部署

---

## 3️⃣ Netlify

### 优点
- ✅ 拖拽部署
- ✅ 持续集成
- ✅ 表单处理
- ✅ 自动HTTPS

### 部署步骤

#### 方法A：拖拽部署（最简单）

1. 访问 [app.netlify.com](https://app.netlify.com)
2. 注册/登录
3. 拖拽 `web-version` 文件夹到页面
4. 等待部署完成
5. 得到URL，如：`https://card-generator.netlify.app`

#### 方法B：Git集成

1. 在Netlify点击 "New site from Git"
2. 连接GitHub账号
3. 选择仓库
4. 设置：
   - Build command: (留空)
   - Publish directory: `web-version`
5. 点击 "Deploy site"

#### 方法C：命令行

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
cd web-version
netlify deploy

# 部署到生产环境
netlify deploy --prod
```

---

## 4️⃣ Cloudflare Pages

### 优点
- ✅ 全球最快的CDN
- ✅ 无限带宽
- ✅ DDoS防护
- ✅ 自动HTTPS

### 部署步骤

1. **注册Cloudflare账号**
   - 访问 [pages.cloudflare.com](https://pages.cloudflare.com)

2. **创建项目**
   - 点击 "Create a project"
   - 连接GitHub

3. **配置构建**
   - 框架预设：None
   - Build command：(留空)
   - Build output directory：`/`
   - Root directory：`web-version`

4. **部署**
   - 点击 "Save and Deploy"
   - 得到URL：`https://card-generator.pages.dev`

---

## 5️⃣ 自托管

### 使用Nginx

```nginx
# /etc/nginx/sites-available/card-generator
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/card-generator;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 开启gzip压缩
    gzip on;
    gzip_types text/html text/css application/javascript;
}
```

### 使用Apache

```apache
# .htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# 开启gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

---

## 🔧 自定义域名

### GitHub Pages

1. 在仓库根目录创建 `CNAME` 文件
   ```
   your-domain.com
   ```

2. 在DNS提供商添加记录：
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

### Vercel

```bash
# 添加域名
vercel domains add your-domain.com

# 配置DNS
vercel domains inspect your-domain.com
```

### Netlify

1. 在Netlify后台 → Domain settings
2. 点击 "Add custom domain"
3. 按照提示配置DNS

---

## 🔐 HTTPS配置

所有推荐的平台都**自动提供免费HTTPS**：
- ✅ GitHub Pages：自动启用
- ✅ Vercel：自动启用
- ✅ Netlify：自动启用
- ✅ Cloudflare：自动启用

自托管可使用 [Let's Encrypt](https://letsencrypt.org/)：

```bash
# 安装certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com
```

---

## 📊 性能优化

### 启用CDN

所有推荐平台都自带全球CDN，无需额外配置。

### 压缩文件

```bash
# 使用gzip压缩
gzip -9 index.html

# 或使用在线工具
# https://www.giftofspeed.com/gzip-test/
```

### 缓存策略

在 `vercel.json` 或 `netlify.toml` 中配置：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🔄 持续部署

### GitHub Actions + GitHub Pages

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web-version
```

### 自动部署流程

1. 推送代码到GitHub
2. 自动触发构建
3. 自动部署到生产环境
4. 完成！

---

## 📱 移动端优化

已内置优化，无需额外配置：
- ✅ 响应式设计
- ✅ 触摸优化
- ✅ Viewport配置
- ✅ 移动端性能优化

---

## 🧪 测试部署

### 本地测试

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve web-version

# PHP
php -S localhost:8000

# 访问
http://localhost:8000
```

### 生产环境检查清单

- [ ] HTTPS已启用
- [ ] 自定义域名已配置（可选）
- [ ] 页面可正常访问
- [ ] 功能正常工作
- [ ] 移动端显示正常
- [ ] 加载速度良好（<2秒）

---

## 🆘 常见问题

### Q: 部署后页面空白？
**A:** 检查文件路径是否正确，确保 `index.html` 在根目录

### Q: GitHub Pages显示404？
**A:** 等待5-10分钟，GitHub需要时间构建

### Q: 自定义域名不生效？
**A:** DNS传播需要时间（最多24小时），使用 [DNS Checker](https://dnschecker.org/) 检查

### Q: 如何更新网站？
**A:** 
- GitHub Pages：推送新代码即可
- Vercel/Netlify：推送代码或重新拖拽

---

## 📈 监控和分析

### Google Analytics

在 `index.html` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Vercel Analytics

```bash
# 在Vercel后台启用Analytics
# 无需修改代码
```

---

## 🎉 部署成功！

恭喜！您的测试卡号生成器已经上线。

### 下一步

1. ✅ 分享URL给团队
2. ✅ 添加自定义域名（可选）
3. ✅ 配置分析工具（可选）
4. ✅ 开始使用！

---

**需要帮助？** 查看各平台的官方文档或提交Issue

