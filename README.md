# 💳 银行卡自动填充助手

> 专业的支付系统开发测试工具

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](manifest.json)

## 📋 项目简介

这是一个专为**支付系统开发者**设计的浏览器扩展工具，用于快速生成和填充测试卡号，提高开发测试效率。

### ⚠️ 重要说明

**本工具仅供开发测试使用！**

- ✅ **合法用途**: 测试自己的支付系统、表单验证、UI/UX开发
- ❌ **禁止用途**: 用于任何欺诈、绕过付费的行为

---

## ✨ 主要功能

### 1. 智能卡号生成
- ✅ **Luhn算法验证** - 生成数学上有效的卡号
- ✅ **多品牌支持** - Visa、MasterCard、Amex、Discover、JCB等
- ✅ **自定义BIN** - 支持自定义银行识别码
- ✅ **批量生成** - 支持批量生成测试卡号

### 2. 自动表单填充
- ✅ **一键填充** - 自动填充卡号、有效期、CVV
- ✅ **地址生成** - 使用Faker.js生成真实格式的美国地址
- ✅ **智能识别** - 自动识别表单字段

### 3. 测试辅助
- ✅ **测试模式标识** - 清晰显示当前为测试模式
- ✅ **详细日志** - 控制台输出详细操作日志

---

## 🚀 快速开始

### 安装步骤

1. **克隆或下载项目**
   ```bash
   git clone https://github.com/wang-xi-lei/card-autofill-helper.git
   cd card-autofill-helper
   ```

2. **加载扩展到浏览器**
   
   **Chrome/Edge:**
   - 打开 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

   **Firefox:**
   - 打开 `about:debugging#/runtime/this-firefox`
   - 点击"临时加载附加组件"
   - 选择 `manifest.json` 文件

3. **开始使用**
   - 点击浏览器工具栏中的扩展图标
   - 选择或输入BIN前缀
   - 点击相应按钮执行操作

---

## 📖 使用指南

### 浏览器扩展版

#### 1. 自动填充表单

```
1. 打开您的支付表单页面
2. 点击扩展图标
3. 选择BIN前缀（或使用自定义BIN）
4. 点击"自动填入表单"
5. 扩展会自动填充所有字段
```

#### 2. 批量生成测试卡号

```
1. 点击扩展图标
2. 选择生成数量
3. 点击"批量生成卡号"
4. 格式: 卡号|有效期|CVV
```

### Web独立版

独立Web版本位于 `web-version/` 文件夹：

```bash
cd web-version
# 直接打开 index.html 或使用本地服务器
python -m http.server 8000
```

**特点：**
- 无需安装扩展
- 支持多种输出格式（PIPE/CSV/JSON/XML）
- 可自定义日期和CVV
- 支持在线部署

详见：[WEB_VERSION_README.md](WEB_VERSION_README.md)

---

## 📁 项目结构

```
card-autofill-helper/
├── manifest.json          # 扩展配置
├── background.js          # 后台服务脚本
├── popup.html            # 弹出界面HTML
├── popup.css             # 弹出界面样式
├── popup.js              # 弹出界面逻辑
├── utils.js              # 工具函数（Luhn算法等）
├── icon.png              # 扩展图标
├── public/
│   ├── jq-3.7.1.min.js   # jQuery库
│   └── faker-5.5.3.min.js # Faker.js库
├── web-version/          # Web独立版本
│   ├── index.html        # 单文件Web应用
│   ├── README.md         # Web版说明
│   ├── DEPLOY.md        # 部署指南
│   └── ...
├── README.md             # 本文件
├── TESTING_GUIDE.md      # 测试指南
└── CHANGELOG.md          # 更新日志
```

---

## 🔧 技术栈

- **Manifest V3** - Chrome扩展最新版本
- **jQuery 3.7.1** - DOM操作
- **Faker.js 5.5.3** - 虚假数据生成
- **Luhn算法** - 卡号校验

---

## 📊 Luhn算法说明

本工具使用Luhn算法（也称为模10算法）生成有效的卡号。

### 算法原理

1. 从右往左，偶数位数字乘以2
2. 如果结果大于9，减去9
3. 所有数字求和
4. 和能被10整除，则有效

---

## ⚠️ 法律声明

### 使用限制

本工具仅供**合法的开发测试目的**使用：

✅ **允许：**
- 测试自己开发的支付系统
- 验证表单验证逻辑
- UI/UX开发和演示
- 学习支付系统原理

❌ **禁止：**
- 用于任何形式的欺诈行为
- 尝试绕过付费服务
- 冒充他人进行交易
- 任何其他非法用途

### 免责声明

- 本工具生成的卡号**不是真实银行账户**
- 这些卡号**没有实际支付能力**
- 作者不对任何滥用行为负责
- 使用者需遵守当地法律法规

**如果您不确定某个用途是否合法，请咨询法律专业人士。**

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本历史。

---

## 📧 联系方式

- **问题反馈**: [GitHub Issues](https://github.com/wang-xi-lei/card-autofill-helper/issues)
- **功能建议**: 欢迎提交Issue或PR

---

## 📜 许可证

本项目采用 MIT 许可证

---

## 🙏 致谢

- [jQuery](https://jquery.com/) - DOM操作库
- [Faker.js](https://github.com/marak/Faker.js/) - 数据生成库
- [Stripe](https://stripe.com/docs/testing) - 测试卡号参考

---

## ⭐ Star History

如果这个项目对您有帮助，请给个Star⭐️！

---

**记住：负责任地使用，仅用于合法的开发测试！** 🎯
