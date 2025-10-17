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
- ✅ **多品牌支持** - Visa、MasterCard、Amex、银联等
- ✅ **自定义BIN** - 支持自定义银行识别码
- ✅ **批量生成** - 一次生成5-50个测试卡号

### 2. 自动表单填充
- ✅ **一键填充** - 自动填充卡号、有效期、CVV
- ✅ **地址生成** - 使用Faker.js生成真实格式的美国地址
- ✅ **智能识别** - 自动识别表单字段

### 3. 测试辅助
- ✅ **测试模式标识** - 清晰显示当前为测试模式
- ✅ **官方测试卡** - 内置Stripe等平台的官方测试卡号
- ✅ **详细日志** - 控制台输出详细操作日志

---

## 🚀 快速开始

### 安装步骤

1. **克隆或下载项目**
   ```bash
   git clone https://github.com/yourusername/card-autofill-helper.git
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

### 基础操作

#### 1. 生成单个测试卡并填充表单

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
2. 选择生成数量（5/10/20/50）
3. 点击"批量生成卡号"
4. 卡号列表显示在文本框中
5. 格式: 卡号|有效期|CVV
```

#### 3. 使用自定义BIN

```
1. 在"自定义BIN"输入框中输入4-8位数字
2. 自定义BIN优先级高于下拉选择
3. 点击任何生成按钮
4. 工具会使用您的自定义BIN
```

### 高级功能

#### BIN选择说明

| BIN前缀 | 卡品牌 | 卡长度 | CVV长度 |
|---------|--------|--------|---------|
| 559888 | 自定义 | 16 | 3 |
| 622126 | 银联 | 16 | 3 |
| 421769 | Visa | 16 | 3 |
| 532925 | MasterCard | 16 | 3 |
| 424242 | Stripe测试(Visa) | 16 | 3 |
| 555555 | Stripe测试(MC) | 16 | 3 |
| 378282 | Amex | 15 | 4 |

#### 生成的数据示例

```
卡号: 5598884005115278
有效期: 12/28
CVV: 696
持卡人: John Doe
地址: 123 Main St, Apt 4B
城市: New York
州: NY
邮编: 10001
国家: US
```

---

## 🧪 测试场景

### 推荐测试流程

1. **表单验证测试**
   - 使用本工具生成的卡号
   - 测试Luhn算法验证
   - 测试格式验证
   - 测试错误提示

2. **支付集成测试**
   - 使用支付处理商官方测试卡
   - 测试支付成功流程
   - 测试支付失败处理
   - 测试3DS验证

3. **UI/UX测试**
   - 测试不同卡品牌识别
   - 测试地址自动填充
   - 测试响应式布局

详细测试指南请查看：[TESTING_GUIDE.md](TESTING_GUIDE.md)

---

## 🔧 技术栈

- **Manifest V3** - Chrome扩展最新版本
- **jQuery 3.7.1** - DOM操作
- **Faker.js 5.5.3** - 虚假数据生成
- **Luhn算法** - 卡号校验

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
├── README.md             # 项目说明
├── TESTING_GUIDE.md      # 测试指南
└── CHANGELOG.md          # 更新日志
```

---

## 🛠️ 开发指南

### 本地开发

1. **修改代码**
   - 编辑相应的文件
   - 保存更改

2. **重新加载扩展**
   - Chrome: 在 `chrome://extensions/` 点击刷新按钮
   - Firefox: 在 `about:debugging` 重新加载

3. **查看日志**
   - 右键点击扩展图标 > "检查弹出内容"
   - 打开控制台查看日志

### 添加新的BIN

编辑 `popup.html`:

```html
<option value="YOUR_BIN">YOUR_BIN (品牌名)</option>
```

### 修改生成逻辑

编辑 `utils.js` 中的相关函数：
- `generateCardInfo()` - 卡号生成
- `validateBin()` - BIN验证
- `detectCardBrand()` - 卡品牌识别

---

## 📊 Luhn算法说明

本工具使用Luhn算法（也称为模10算法）生成有效的卡号。

### 算法原理

1. 从右往左，偶数位数字乘以2
2. 如果结果大于9，减去9
3. 所有数字求和
4. 和能被10整除，则有效

### 示例

```
卡号: 5598 8840 0511 5278

步骤1: 8*2, 2*2, 1*2, 5*2, 0*2, 4*2, 8*2, 8*2, 8*2
步骤2: 16→7, 4, 2, 10→1, 0, 8, 16→7, 16→7, 16→7
步骤3: 7+7+4+9+2+5+1+1+0+5+8+4+7+7+7 = 80
步骤4: 80 % 10 = 0 ✅ 有效
```

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

### 最新版本 (2.0.0)

- ✨ 添加测试模式标识
- ✨ 新增更多官方测试卡BIN
- ✨ 改进BIN验证逻辑
- 🐛 修复批量生成时的错误处理
- 📚 完善测试文档

---

## 📧 联系方式

- **问题反馈**: [GitHub Issues](https://github.com/yourusername/card-autofill-helper/issues)
- **功能建议**: 欢迎提交Issue或PR

---

## 📜 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

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

