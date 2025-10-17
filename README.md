# 💳 测试卡号生成器 & 自动填充助手

> 专业的支付系统开发测试工具 | 浏览器扩展 + 独立Web版本

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](manifest.json)
[![Browser Extension](https://img.shields.io/badge/Extension-Chrome%20%7C%20Edge%20%7C%20Firefox-4285F4)](#)
[![Web Version](https://img.shields.io/badge/Web-在线使用-10b981)](web-version/index.html)

## 📋 项目简介

一个专为**支付系统开发者**和**前端工程师**设计的测试工具套件，帮助快速生成符合Luhn算法的测试卡号，自动填充支付表单，显著提升开发测试效率。

### 🎯 双版本支持

| 版本 | 特点 | 适用场景 |
|------|------|----------|
| **🧩 浏览器扩展版** | 一键自动填充、智能表单识别、完整测试数据生成 | 需要自动填充表单的开发测试场景 |
| **🌐 独立Web版** | 无需安装、在线即用、多格式输出、可自定义参数 | 快速生成卡号、批量生成、团队分享 |

### ⚠️ 重要说明

**本工具仅供开发测试使用！**

- ✅ **合法用途**: 测试自己的支付系统、表单验证、UI/UX开发、学习Luhn算法
- ❌ **禁止用途**: 任何欺诈行为、绕过付费服务、真实交易尝试

---

## ✨ 核心功能

### 🧩 浏览器扩展版功能

#### 1. 智能卡号生成
- ✅ **Luhn算法验证** - 生成数学上有效的测试卡号
- ✅ **多品牌支持** - Visa、MasterCard、Amex、Discover、JCB、Diners等
- ✅ **自定义BIN** - 支持自定义银行识别码（4-8位）
- ✅ **批量生成** - 一次生成多张测试卡号

#### 2. 一键自动填充
- ✅ **表单自动填充** - 自动识别并填充卡号、有效期、CVV字段
- ✅ **地址信息生成** - 使用Faker.js生成真实格式的美国测试地址
- ✅ **智能字段识别** - 自动匹配常见的表单字段名称和类型
- ✅ **即时反馈** - 控制台详细日志，便于调试

#### 3. 测试辅助功能
- ✅ **测试模式标识** - 清晰显示当前处于测试模式
- ✅ **详细日志输出** - 控制台输出完整操作记录
- ✅ **快捷操作** - 简洁的弹出界面，操作流畅

### 🌐 独立Web版功能

#### 1. 灵活配置
- ✅ **预设BIN库** - 内置常用测试BIN（Visa、MasterCard等）
- ✅ **自定义BIN** - 支持输入任意4-8位BIN前缀
- ✅ **自定义有效期** - 可指定月份和年份或随机生成
- ✅ **自定义CVV** - 可指定CVV值或自动生成

#### 2. 多格式输出
- ✅ **PIPE格式** - `卡号|月份|年份|CVV`（默认）
- ✅ **CSV格式** - 带表头的标准CSV格式
- ✅ **JSON格式** - 结构化JSON数据
- ✅ **XML格式** - 标准XML格式

#### 3. 批量生成
- ✅ **批量模式** - 支持生成10/20/50/100/200/500张卡号
- ✅ **实时统计** - 显示生成数量、卡品牌等信息
- ✅ **一键复制** - 快速复制所有生成结果
- ✅ **文件下载** - 导出为TXT文件

---

## 🚀 快速开始

### 方法1: 浏览器扩展版（推荐用于自动填充）

#### 安装步骤

1. **克隆或下载项目**
   ```bash
   git clone https://github.com/wang-xi-lei/card-autofill-helper.git
   cd card-autofill-helper
   ```

2. **加载扩展到浏览器**
   
   **Chrome/Edge:**
   - 打开 `chrome://extensions/` 或 `edge://extensions/`
   - 启用右上角"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目根目录文件夹

   **Firefox:**
   - 打开 `about:debugging#/runtime/this-firefox`
   - 点击"临时加载附加组件"
   - 选择项目中的 `manifest.json` 文件

3. **开始使用**
   - 打开任意支付表单页面
   - 点击浏览器工具栏中的扩展图标
   - 选择或输入BIN前缀，点击"自动填入表单"

### 方法2: 独立Web版（推荐用于快速生成）

#### 本地使用

1. **直接打开**
   ```bash
   cd web-version
   # 双击 index.html 文件即可在浏览器中打开
   ```

2. **使用本地服务器**（可选）
   ```bash
   # 使用Python
   cd web-version
   python -m http.server 8000
   
   # 使用Node.js
   npx http-server web-version
   
   # 然后访问 http://localhost:8000
   ```

#### 在线部署

支持部署到以下平台（详见 [web-version/DEPLOY.md](web-version/DEPLOY.md)）：
- **GitHub Pages** - 免费静态托管
- **Vercel** - 一键部署，全球CDN
- **Netlify** - 拖拽部署
- **Cloudflare Pages** - 全球边缘网络

---

## 📖 使用指南

### 浏览器扩展版使用

#### 自动填充表单

```
1. 打开支付表单页面（如Stripe测试页面）
2. 点击浏览器工具栏的扩展图标
3. 在弹窗中选择BIN前缀或输入自定义BIN
4. 点击"自动填入表单"按钮
5. 扩展会自动填充所有识别到的字段
```

**支持的字段类型：**
- 卡号（Card Number）
- 有效期月份（MM）
- 有效期年份（YY/YYYY）
- CVV/CVC/安全码
- 姓名（First Name / Last Name）
- 地址（Address / City / State / ZIP）

#### 批量生成卡号

```
1. 点击扩展图标打开弹窗
2. 选择生成数量（10/20/50/100等）
3. 点击"批量生成卡号"
4. 结果格式: 卡号|有效期|CVV
5. 结果会显示在文本框中，可复制使用
```

### 独立Web版使用

#### 基础模式（快速生成）

```
1. 选择预设BIN或输入自定义BIN
2. 配置有效期和CVV（可选）
3. 点击"生成"按钮
4. 查看生成结果
5. 点击"复制"按钮一键复制
```

#### 高级模式（批量生成）

```
1. 切换到"高级"标签页
2. 选择输出格式（PIPE/CSV/JSON/XML）
3. 选择生成数量（10-500）
4. 点击"生成"按钮
5. 使用"复制"或"下载"按钮保存结果
```

---

## 📁 项目结构

```
card-autofill-helper/
├── manifest.json              # 扩展配置文件（Manifest V3）
├── background.js              # 后台服务脚本
├── popup.html                 # 扩展弹出界面HTML
├── popup.css                  # 扩展弹出界面样式
├── popup.js                   # 扩展弹出界面逻辑
├── utils.js                   # 工具函数（Luhn算法等）
├── icon.png                   # 扩展图标
├── public/                    # 第三方库
│   ├── jq-3.7.1.min.js       # jQuery 3.7.1
│   └── faker-5.5.3.min.js    # Faker.js 5.5.3
├── web-version/               # Web独立版本
│   ├── index.html            # 单文件Web应用
│   ├── README.md             # Web版说明文档
│   ├── DEPLOY.md             # 部署指南
│   ├── COMPARISON.md         # 功能对比
│   └── PROJECT_INFO.md       # 项目信息
├── README.md                  # 主说明文档（本文件）
├── TESTING_GUIDE.md          # 测试指南
├── CHANGELOG.md              # 版本更新日志
└── WEB_VERSION_README.md     # Web版快速指南
```

---

## 🔧 技术栈

### 浏览器扩展版
- **Manifest V3** - Chrome扩展最新标准
- **jQuery 3.7.1** - DOM操作和事件处理
- **Faker.js 5.5.3** - 生成真实格式的虚假数据
- **Luhn算法** - 卡号校验和生成

### 独立Web版
- **纯HTML/CSS/JavaScript** - 无外部依赖
- **响应式设计** - 支持移动端和桌面端
- **Luhn算法** - 自实现卡号校验
- **现代UI设计** - 简洁美观的用户界面

---

## 💳 支持的卡品牌

| 品牌 | BIN前缀规则 | 卡号长度 | CVV长度 | 示例BIN |
|------|-------------|----------|---------|---------|
| **Visa** | 以 `4` 开头 | 16位 | 3位 | 421769 |
| **MasterCard** | `51-55` 或 `2221-2720` | 16位 | 3位 | 532925 |
| **American Express** | `34` 或 `37` 开头 | 15位 | 4位 | 378282 |
| **Discover** | `6011` 或 `644-649` 或 `65` | 16位 | 3位 | 601111 |
| **JCB** | `352-358` 开头 | 16位 | 3位 | 352800 |
| **Diners Club** | `36` 或 `38` 或 `30` 开头 | 14位 | 3位 | 300000 |

---

## 📊 Luhn算法说明

本工具使用**Luhn算法**（也称为"模10算法"）生成和验证测试卡号。

### 算法原理

1. 从右往左，对偶数位的数字乘以2
2. 如果乘积大于9，则减去9
3. 将所有数字求和
4. 如果总和能被10整除，则卡号有效

### 示例

验证卡号 `4532015112830366`：

```
位置: 16 15 14 13 12 11 10  9  8  7  6  5  4  3  2  1
卡号:  4  5  3  2  0  1  5  1  1  2  8  3  0  3  6  6
乘2:   4 10  3  4  0  2  5  2  1  4  8  6  0  6  6 12
处理:  4  1  3  4  0  2  5  2  1  4  8  6  0  6  6  3
总和: 4+1+3+4+0+2+5+2+1+4+8+6+0+6+6+3 = 55 ❌

正确的校验位应使总和为60，所以最后一位应该是1。
```

---

## 🎯 使用场景

### 开发测试
- ✅ 测试支付表单的UI/UX
- ✅ 验证表单验证逻辑的正确性
- ✅ 测试卡号格式化显示
- ✅ 调试支付流程

### 学习研究
- ✅ 学习Luhn算法原理
- ✅ 了解银行卡号结构
- ✅ 研究BIN识别规则
- ✅ 实践前端表单处理

### 团队协作
- ✅ 统一团队测试数据
- ✅ 快速生成测试用例
- ✅ 分享测试卡号给QA团队
- ✅ 自动化测试数据准备

---

## ⚠️ 法律声明与使用限制

### 合法使用范围

本工具**仅供合法的开发测试目的**使用：

✅ **允许的用途：**
- 测试自己开发的支付系统和表单
- 验证表单验证逻辑的正确性
- UI/UX开发和演示
- 学习支付系统原理和Luhn算法
- 自动化测试脚本中使用

❌ **严格禁止：**
- 用于任何形式的欺诈行为
- 尝试在真实支付场景中使用
- 绕过付费服务或内容
- 冒充他人进行交易
- 任何其他非法或不道德的用途

### 技术说明

- ✅ 生成的卡号**通过Luhn算法验证**（数学上有效）
- ❌ 卡号**不是真实银行账户**
- ❌ 卡号**没有实际支付能力**
- ✅ 仅用于**表单验证和前端测试**

### 免责声明

1. 本工具生成的所有卡号均为**测试数据**，不对应任何真实账户
2. 作者不对任何滥用行为承担责任
3. 使用者需遵守所在地区的法律法规
4. 建议仅在开发环境中使用

**如果您不确定某个用途是否合法，请咨询法律专业人士。**

---

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 贡献流程

1. **Fork本项目**
2. **创建特性分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **开启Pull Request**

### 代码规范

- 遵循现有代码风格
- 添加必要的注释
- 更新相关文档
- 确保功能正常运行

---

## 📝 更新日志

### v2.0.0 (2025-10-17)
- ✨ 新增独立Web版本
- ✨ Web版支持多格式输出（PIPE/CSV/JSON/XML）
- ✨ 优化UI设计，更现代化的界面
- ✨ 改进卡品牌识别算法
- 📖 完善文档结构

### v1.0.0
- ✨ 初始版本发布
- ✨ 浏览器扩展基础功能
- ✨ 自动填充表单
- ✨ 批量生成卡号

详见：[CHANGELOG.md](CHANGELOG.md)

---

## 🌐 浏览器兼容性

### 扩展版

| 浏览器 | 支持状态 | 最低版本 |
|--------|----------|----------|
| Chrome | ✅ 完全支持 | v88+ |
| Edge | ✅ 完全支持 | v88+ |
| Firefox | ✅ 完全支持 | v109+ |
| Opera | ✅ 完全支持 | v74+ |
| Safari | ⚠️ 需适配 | - |

### Web版

| 浏览器 | 支持状态 | 最低版本 |
|--------|----------|----------|
| Chrome | ✅ 完全支持 | v90+ |
| Firefox | ✅ 完全支持 | v88+ |
| Safari | ✅ 完全支持 | v14+ |
| Edge | ✅ 完全支持 | v90+ |
| Opera | ✅ 完全支持 | v76+ |

---

## 📧 联系方式

- **问题反馈**: [GitHub Issues](https://github.com/wang-xi-lei/card-autofill-helper/issues)
- **功能建议**: 欢迎提交Issue或Pull Request
- **安全问题**: 请通过私密方式联系

---

## 🙏 致谢

- [jQuery](https://jquery.com/) - 强大的JavaScript库
- [Faker.js](https://github.com/marak/Faker.js/) - 测试数据生成
- [Stripe](https://stripe.com/docs/testing) - 测试卡号参考标准
- [Hans Peter Luhn](https://en.wikipedia.org/wiki/Luhn_algorithm) - Luhn算法发明者

---

## 📜 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

Copyright (c) 2025 wang-xi-lei

---

## ⭐ Star History

如果这个项目对您有帮助，请给个Star⭐️支持一下！

---

## 🔗 相关资源

- [Stripe测试卡号](https://stripe.com/docs/testing) - 官方测试卡号
- [Luhn算法详解](https://en.wikipedia.org/wiki/Luhn_algorithm) - 维基百科
- [支付卡行业数据安全标准](https://www.pcisecuritystandards.org/) - PCI DSS
- [BIN/IIN数据库](https://binlist.net/) - 银行识别码查询

---

**记住：负责任地使用，仅用于合法的开发测试！** 🎯

**祝开发顺利！** 🚀

