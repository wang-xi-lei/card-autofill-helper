# 💳 测试卡号生成器 - Web独立版

> 无需安装扩展，在线即用的测试卡号生成工具

[![Web Demo](https://img.shields.io/badge/🌐%20在线演示-点击访问-10b981)](index.html)
[![No Dependencies](https://img.shields.io/badge/零依赖-纯原生-blue)]()
[![File Size](https://img.shields.io/badge/文件大小-~60KB-green)]()

## 🎯 产品定位

Web独立版是一个**纯前端单页面应用**，无需安装任何扩展或依赖，直接在浏览器中打开即可使用。专为需要快速生成测试卡号、批量生成或团队分享的场景设计。

---

## ✨ 核心功能

### 🎲 智能生成
- ✅ **Luhn算法验证** - 生成数学上有效的测试卡号
- ✅ **自动品牌识别** - 根据BIN自动识别Visa、MasterCard等品牌
- ✅ **自定义BIN** - 支持输入4-8位自定义BIN前缀
- ✅ **灵活配置** - 可自定义有效期、CVV或随机生成

### 📊 多格式输出
- ✅ **PIPE格式** - `卡号|月份|年份|CVV` (默认，方便复制)
- ✅ **CSV格式** - 标准CSV带表头，可导入Excel
- ✅ **JSON格式** - 结构化数据，便于程序处理
- ✅ **XML格式** - XML标准格式

### ⚡ 批量生成
- ✅ **灵活数量** - 支持10/20/50/100/200/500张批量生成
- ✅ **实时统计** - 显示生成数量、卡品牌等信息
- ✅ **一键复制** - 快速复制所有结果到剪贴板
- ✅ **文件下载** - 导出为TXT文件保存

### 🎨 优质UI/UX
- ✅ **现代化界面** - 简洁美观的渐变色设计
- ✅ **响应式布局** - 完美支持桌面和移动设备
- ✅ **实时反馈** - Toast提示，操作状态清晰可见
- ✅ **开关控制** - 可选择是否包含日期和CVV

---

## 🚀 快速开始

### 方法1：直接打开（最简单）

```bash
# 1. 下载或克隆项目
git clone https://github.com/wang-xi-lei/card-autofill-helper.git

# 2. 进入web-version目录
cd card-autofill-helper/web-version

# 3. 双击 index.html 文件即可在浏览器中打开
```

### 方法2：本地服务器

```bash
# 使用Python启动本地服务器
cd card-autofill-helper/web-version
python -m http.server 8000

# 使用Node.js启动本地服务器
npx http-server -p 8000

# 然后在浏览器访问
# http://localhost:8000
```

### 方法3：在线部署

#### GitHub Pages（推荐）

```bash
# 1. Fork本项目到你的GitHub账户
# 2. 进入仓库设置 Settings > Pages
# 3. Source选择 main 分支的 /web-version 目录
# 4. 保存后自动部署，获得访问链接
```

#### Vercel一键部署

```bash
# 1. 访问 https://vercel.com
# 2. 导入GitHub仓库
# 3. Root Directory设置为 web-version
# 4. 点击Deploy，等待部署完成
```

#### Netlify拖拽部署

```bash
# 1. 访问 https://app.netlify.com
# 2. 将web-version文件夹拖拽到部署区
# 3. 自动部署并生成访问链接
```

详细部署教程：[DEPLOY.md](DEPLOY.md)

---

## 📖 使用指南

### 基础操作

#### 1. 选择或输入BIN

```
方式A：从下拉菜单选择预设BIN
  - 559888 (自定义)
  - 421769 (Visa)
  - 532925 (MasterCard)
  - 378282 (American Express)
  - 601111 (Discover)
  - 352800 (JCB)
  - 300000 (Diners Club)

方式B：在"自定义BIN"输入框输入4-8位数字
  - 自定义BIN优先级高于下拉选择
  - 支持4-8位数字
```

#### 2. 配置生成参数

```
📅 日期配置（可选）
  - 开关：启用/禁用日期生成
  - 月份：随机 或 指定01-12
  - 年份：随机 或 指定2025-2030

🔒 安全码配置（可选）
  - 开关：启用/禁用CVV生成
  - CVV：留空随机 或 指定值
  - 根据卡品牌自动生成3位或4位
```

#### 3. 选择输出格式

```
PIPE格式（推荐）
  5598884005115278|12|2028|696

CSV格式（Excel友好）
  Card Number,Month,Year,CVV
  5598884005115278,12,2028,696

JSON格式（程序友好）
  [
    {
      "number": "5598884005115278",
      "month": "12",
      "year": "2028",
      "cvv": "696",
      "brand": "Unknown"
    }
  ]

XML格式（标准格式）
  <?xml version="1.0" encoding="UTF-8"?>
  <cards>
    <card>
      <number>5598884005115278</number>
      <month>12</month>
      <year>2028</year>
      <cvv>696</cvv>
    </card>
  </cards>
```

#### 4. 生成和使用

```
1. 点击"⚙️ 生成"按钮
2. 查看生成结果和统计信息
3. 使用以下操作：
   - 📋 复制：复制所有结果到剪贴板
   - 💾 下载：下载为TXT文件
   - 🔄 重置：清空结果重新开始
```

---

## 💡 使用技巧

### BIN前缀选择优先级

```
自定义BIN输入框 > 下拉选择BIN

✅ 如果填写了自定义BIN → 使用自定义BIN
❌ 如果未填写自定义BIN → 使用下拉选择的BIN
⚠️ 如果两者都未填写 → 提示错误
```

### 常用测试BIN推荐

| BIN | 品牌 | 长度 | CVV | 说明 |
|-----|------|------|-----|------|
| **424242** | Visa | 16 | 3 | Stripe官方测试卡 |
| **555555** | MasterCard | 16 | 3 | Stripe官方测试卡 |
| **411111** | Visa | 16 | 3 | 通用测试卡 |
| **378282** | Amex | 15 | 4 | 美国运通测试卡 |
| **559888** | 自定义 | 16 | 3 | 自定义测试BIN |
| **601111** | Discover | 16 | 3 | Discover测试卡 |

### 批量生成建议

```
小规模测试：10-20张
  - 适合手工测试
  - 快速验证功能

中规模测试：50-100张
  - 适合批量测试
  - 数据量适中

大规模测试：200-500张
  - 适合压力测试
  - 自动化测试脚本
```

### 快捷键支持

```
回车键（Enter）
  - 在BIN输入框中按回车可快速生成

Ctrl/Cmd + A
  - 全选结果文本框内容

Ctrl/Cmd + C
  - 复制选中的内容
```

---

## 🎨 界面功能说明

### 左侧配置面板

```
基础配置区域
├── 选择 BIN（下拉菜单）
├── 自定义 BIN（输入框）
├── 输出格式（PIPE/CSV/JSON/XML）
├── 日期开关
│   ├── 有效期月份
│   └── 有效期年份
├── 安全码开关
│   └── CVV输入
├── 生成数量（10-500）
└── ⚙️ 生成按钮
```

### 右侧结果面板

```
标签页切换
├── 基础标签（当前）
└── 高级标签（预留）

结果显示区
├── 统计信息
│   ├── 生成数量
│   └── 卡品牌
├── 结果输出区（可滚动）
└── 操作按钮
    ├── 📋 复制
    ├── 💾 下载
    └── 🔄 重置
```

---

## 🔧 技术实现

### 核心算法

#### Luhn算法实现

```javascript
function calculateLuhn(num) {
  let sum = 0;
  let isDouble = true;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i]);
    if (isDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isDouble = !isDouble;
  }
  return ((10 - (sum % 10)) % 10).toString();
}
```

#### 卡品牌识别

```javascript
function detectBrand(bin) {
  if (bin.startsWith('4')) return 'VISA';
  if (/^5[1-5]/.test(bin)) return 'MasterCard';
  if (bin.startsWith('34') || bin.startsWith('37')) return 'Amex';
  if (bin.startsWith('6011') || /^64[4-9]/.test(bin)) return 'Discover';
  if (/^35[2-8]/.test(bin)) return 'JCB';
  if (bin.startsWith('36') || bin.startsWith('30')) return 'Diners';
  return 'Unknown';
}
```

### 技术栈

- **HTML5** - 语义化标签
- **CSS3** - 现代化样式，渐变色设计
- **JavaScript ES6+** - 原生JS，无框架依赖
- **响应式设计** - 支持移动端和桌面端
- **本地存储** - 无需后端，纯前端实现

### 性能指标

```
📦 文件大小：~60KB（单HTML文件）
⚡ 加载时间：<100ms
🚀 生成速度：
   - 10张: <10ms
   - 100张: <50ms
   - 500张: <200ms
💾 内存占用：~2-3MB
```

---

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 支持状态 | 备注 |
|--------|----------|----------|------|
| Chrome | 90+ | ✅ 完全支持 | 推荐使用 |
| Firefox | 88+ | ✅ 完全支持 | 推荐使用 |
| Safari | 14+ | ✅ 完全支持 | macOS/iOS |
| Edge | 90+ | ✅ 完全支持 | 推荐使用 |
| Opera | 76+ | ✅ 完全支持 | - |
| IE | - | ❌ 不支持 | 已停止支持 |

### 移动端支持

```
✅ iOS Safari 14+
✅ Android Chrome 90+
✅ Android Firefox 88+
✅ 响应式布局自动适配
✅ 触摸操作优化
```

---

## 🆚 与浏览器扩展版对比

| 功能特性 | Web版 | 扩展版 | 说明 |
|----------|-------|--------|------|
| 🎲 卡号生成 | ✅ | ✅ | 都支持 |
| 📊 批量生成 | ✅ | ✅ | 都支持 |
| 📝 多格式输出 | ✅ | ❌ | Web版独有 |
| 🔄 自动填充表单 | ❌ | ✅ | 扩展版独有 |
| 📍 地址生成 | ❌ | ✅ | 扩展版独有 |
| 💾 文件下载 | ✅ | ❌ | Web版独有 |
| 📱 移动端支持 | ✅ | ❌ | Web版友好 |
| 🚀 无需安装 | ✅ | ❌ | Web版优势 |
| 🌐 在线部署 | ✅ | ❌ | Web版优势 |
| 🔌 离线使用 | ✅ | ✅ | 都支持 |

### 使用场景建议

```
选择Web版，如果你需要：
✅ 快速生成测试卡号，无需安装
✅ 批量生成并导出为多种格式
✅ 分享给团队成员使用
✅ 在移动设备上使用
✅ 在线访问，随时随地使用

选择扩展版，如果你需要：
✅ 自动填充支付表单
✅ 生成完整的测试地址信息
✅ 频繁在同一浏览器中测试
✅ 一键操作，提高效率
```

---

## 📱 响应式设计

### 桌面端（>768px）

```
布局：左右分栏
├── 左侧：配置面板（380px固定宽度）
└── 右侧：结果面板（自适应宽度）

特点：
- 视野开阔，信息密度高
- 一屏显示所有配置和结果
- 适合批量生成和对比
```

### 移动端（≤768px）

```
布局：上下堆叠
├── 上方：配置面板（全宽）
└── 下方：结果面板（全宽）

特点：
- 触摸操作优化
- 按钮大小适配手指点击
- 滚动流畅，操作便捷
```

---

## ⚠️ 重要声明

### 合法使用

**本工具仅供开发测试使用！**

✅ **允许的用途：**
- 测试支付表单的UI/UX
- 验证表单验证逻辑
- 学习Luhn算法原理
- 开发环境测试
- 自动化测试数据准备

❌ **严格禁止：**
- 用于真实支付交易
- 任何形式的欺诈行为
- 绕过付费服务或内容
- 冒充他人进行操作
- 其他非法或不道德用途

### 技术说明

```
✅ 生成的卡号通过Luhn算法验证（数学上有效）
❌ 卡号不是真实银行账户
❌ 卡号没有实际支付能力
✅ 仅用于表单验证测试
```

### 免责声明

- 本工具生成的卡号均为测试数据
- 作者不对任何滥用行为承担责任
- 使用者需遵守所在地区法律法规
- 建议仅在开发/测试环境使用

---

## 🔧 自定义修改

### 添加更多预设BIN

编辑 `index.html`，找到 `<select id="binSelect">`：

```html
<select class="form-select" id="binSelect" onchange="updateBinFromSelect()">
  <option value="">-- 选择预设 BIN --</option>
  <option value="559888">559888</option>
  <!-- 在这里添加更多BIN -->
  <option value="YOUR_BIN">YOUR_BIN - 描述</option>
</select>
```

### 修改默认生成数量

找到 `<select id="quantity">`：

```html
<select class="form-select" id="quantity">
  <option value="10" selected>10</option>
  <option value="20">20</option>
  <!-- 修改selected属性改变默认值 -->
</select>
```

### 自定义颜色主题

修改CSS颜色变量：

```css
/* 主色调 - 绿色系 */
--primary-color: #10b981;
--primary-hover: #059669;

/* 修改为蓝色系 */
--primary-color: #3b82f6;
--primary-hover: #2563eb;

/* 修改为紫色系 */
--primary-color: #8b5cf6;
--primary-hover: #7c3aed;
```

---

## 📝 更新日志

### v2.0.0 (2025-10-17)
- ✨ 全新UI设计，现代化界面
- ✨ 新增多格式输出支持（PIPE/CSV/JSON/XML）
- ✨ 新增文件下载功能
- ✨ 改进响应式设计
- ✨ 优化移动端体验
- ✨ 新增实时统计信息
- 🐛 修复已知问题

### v1.0.0 (2025-10-15)
- ✨ 初始版本发布
- ✨ 基础卡号生成功能
- ✨ 批量生成功能
- ✨ 一键复制功能
- ✨ 响应式布局

---

## 🤝 反馈与贡献

### 问题反馈

遇到问题？欢迎反馈：
- 📝 [提交Issue](https://github.com/wang-xi-lei/card-autofill-helper/issues)
- 💬 描述问题和复现步骤
- 📸 提供截图会更有帮助

### 功能建议

有好的想法？欢迎建议：
- 💡 通过Issue提出新功能建议
- 🎨 分享你的设计想法
- 🔧 提交Pull Request

### 贡献代码

```bash
# 1. Fork项目
# 2. 创建特性分支
git checkout -b feature/YourFeature

# 3. 修改代码并测试
# 4. 提交更改
git commit -m 'Add some feature'

# 5. 推送到分支
git push origin feature/YourFeature

# 6. 创建Pull Request
```

---

## 📚 相关文档

- [主项目README](../README.md) - 完整项目说明
- [部署指南](DEPLOY.md) - 详细部署教程
- [功能对比](COMPARISON.md) - Web版vs扩展版
- [项目信息](PROJECT_INFO.md) - 技术细节
- [测试指南](../TESTING_GUIDE.md) - 测试方法
- [更新日志](../CHANGELOG.md) - 版本历史

---

## 🙏 致谢

- [Luhn算法](https://en.wikipedia.org/wiki/Luhn_algorithm) - Hans Peter Luhn
- [Stripe测试卡号](https://stripe.com/docs/testing) - 测试标准参考
- 感谢所有使用和反馈的开发者

---

## 📜 许可证

MIT License - 自由使用，遵守法律

---

## ⭐ 支持项目

如果这个工具对您有帮助：
- ⭐ 给项目点个Star
- 🔗 分享给更多开发者
- 💬 提供反馈和建议
- 🤝 贡献代码

---

**祝测试顺利！** 🎉

**记住：负责任地使用，仅用于合法的开发测试！** 🎯

