/**
 * 银行卡自动填充助手 - 弹出页面脚本
 * 负责用户界面交互和数据管理
 */

class AutoFillManager {
  constructor() {
    this.init();
  }

  /**
   * 初始化管理器
   */
  async init() {
    // 绑定事件监听器
    $('#fillForm').click(() => this.fillCardForm());
    $('#goToBindPage').click(() => this.goToBindPage());
    $('#generateCards').click(() => this.generateCards());

    // 加载保存的设置
    await this.loadSavedSettings();

    // 监听设置变化并保存
    $('#binSelect').change((e) => this.saveBinSelection(e.target.value));
    $('#customBinInput').on('input', (e) => this.validateAndSaveCustomBin(e.target.value));
    $('#quantitySelect').change((e) => this.saveQuantitySelection(e.target.value));
  }

  /**
   * 加载保存的设置
   */
  async loadSavedSettings() {
    try {
      const storage = await chrome.storage.local.get(['selectedBin', 'customBin', 'selectedQuantity']);
      
      const selectedBin = storage.selectedBin;
      const customBin = storage.customBin;
      const selectedQuantity = storage.selectedQuantity;

      // 恢复BIN选择
      if (selectedBin) {
        $('#binSelect').val(selectedBin);
        console.log('已恢复上次的BIN选择:', selectedBin);
      } else {
        const defaultBin = $('#binSelect option:first').val();
        $('#binSelect').val(defaultBin);
        console.log('使用默认BIN选择:', defaultBin);
      }

      // 恢复自定义BIN
      if (customBin) {
        $('#customBinInput').val(customBin);
        console.log('已恢复上次的自定义BIN:', customBin);
      }

      // 恢复数量选择
      if (selectedQuantity) {
        $('#quantitySelect').val(selectedQuantity);
        console.log('已恢复上次的数量选择:', selectedQuantity);
      } else {
        $('#quantitySelect').val('10');
        console.log('使用默认数量选择: 10');
      }
    } catch (error) {
      console.error('加载设置失败:', error);
      // 使用默认值
      const defaultBin = $('#binSelect option:first').val();
      $('#binSelect').val(defaultBin);
      $('#quantitySelect').val('10');
    }
  }

  /**
   * 保存BIN选择
   */
  async saveBinSelection(bin) {
    try {
      await chrome.storage.local.set({ selectedBin: bin });
      console.log('已保存BIN选择:', bin);
    } catch (error) {
      console.error('保存BIN选择失败:', error);
    }
  }

  /**
   * 保存数量选择
   */
  async saveQuantitySelection(quantity) {
    try {
      await chrome.storage.local.set({ selectedQuantity: quantity });
      console.log('已保存数量选择:', quantity);
    } catch (error) {
      console.error('保存数量选择失败:', error);
    }
  }

  /**
   * 验证自定义BIN格式
   */
  isValidCustomBin(bin) {
    if (!bin) return true; // 空值有效（表示不使用自定义）
    return /^\d{4,10}$/.test(bin); // 4-10位数字
  }

  /**
   * 验证并保存自定义BIN
   */
  async validateAndSaveCustomBin(bin) {
    // 只保留数字
    const cleanBin = bin.replace(/\D/g, '');
    
    if (cleanBin !== bin) {
      $('#customBinInput').val(cleanBin);
      bin = cleanBin;
    }

    try {
      await chrome.storage.local.set({ customBin: bin });
      if (bin) {
        console.log('已保存自定义BIN:', bin);
      }
    } catch (error) {
      console.error('保存自定义BIN失败:', error);
    }
  }

  /**
   * 获取选中的BIN（优先使用自定义BIN）
   */
  getSelectedBin() {
    const customBin = $('#customBinInput').val().trim();
    if (customBin) {
      console.log('✅ 使用自定义BIN（优先级高）:', customBin);
      return customBin;
    }

    const selectedBin = $('#binSelect').val();
    console.log('📋 使用下拉选择BIN:', selectedBin);
    return selectedBin;
  }

  /**
   * 获取选中的生成数量
   */
  getSelectedQuantity() {
    const quantity = parseInt($('#quantitySelect').val()) || 10;
    console.log('选择的生成数量:', quantity);
    return quantity;
  }

  /**
   * 批量生成卡号
   */
  generateCards() {
    try {
      const bin = this.getSelectedBin();
      const quantity = this.getSelectedQuantity();

      console.log(`开始生成 ${quantity} 个卡号，使用BIN: ${bin}，算法: Luhn`);

      const cards = [];
      const failedIndices = [];

      // 生成卡号
      for (let i = 0; i < quantity; i++) {
        try {
          const cardInfo = generateCardInfo(bin);
          cards.push(cardInfo);
        } catch (error) {
          console.error(`❌ 生成第${i + 1}个卡号失败:`, error.message);
          
          // 如果是BIN验证失败，直接停止
          if (error.message.includes('BIN校验失败')) {
            $('#cardOutput').val(`生成失败: ${error.message}\n\n请检查BIN是否正确。`);
            return;
          }
          
          failedIndices.push(i + 1);
          continue;
        }
      }

      // 检查是否全部失败
      if (cards.length === 0) {
        $('#cardOutput').val('生成失败：所有卡号生成都失败了，请检查BIN设置');
        console.error('所有卡号生成失败');
        return;
      }

      // 格式化输出
      let output = '';
      const timestamp = new Date().toLocaleString('zh-CN');
      const cardBrand = cards[0].cardBrand || 'Unknown';

      output += `=== 生成时间: ${timestamp} ===\n`;
      output += `BIN前缀: ${bin}\n`;
      output += `卡品牌: ${cardBrand}\n`;
      output += `校验算法: Luhn\n`;
      output += `成功生成: ${cards.length}/${quantity} 个卡号\n`;
      
      if (failedIndices.length > 0) {
        output += `失败序号: ${failedIndices.join(', ')}\n`;
      }
      
      output += `\n`;

      // 输出卡号信息（格式：卡号|有效期|CVV）
      cards.forEach((card, index) => {
        const cardNumber = (card.cardNumber || '').toString().replace(/\s/g, '');
        output += `${cardNumber}|${card.expiryDate}|${card.cvc}\n`;
      });

      $('#cardOutput').val(output);

      // 控制台日志
      console.log(`=== 【${timestamp}】生成卡号完成 ===`);
      console.log(`🔢 成功生成: ${cards.length}/${quantity} 个卡号`);
      console.log(`💳 BIN前缀: ${bin}`);
      console.log(`🏷️ 卡品牌: ${cardBrand}`);
      console.log(`🔐 校验算法: Luhn`);
      
      if (failedIndices.length > 0) {
        console.log(`❌ 失败序号: ${failedIndices.join(', ')}`);
      }
      
      console.log('📋 详细信息已显示在文本框中');
      console.log('=======================================');

    } catch (error) {
      console.error('生成卡号失败:', error);
      $('#cardOutput').val(`生成失败: ${error.message}`);
    }
  }

  /**
   * 跳转到绑卡页面
   */
  async goToBindPage() {
    try {
      console.log('发送消息到background处理跳转...');
      
      const response = await chrome.runtime.sendMessage({
        action: 'goToBindPage'
      });

      if (response && response.success) {
        console.log('✅', response.message);
      } else {
        console.error('跳转失败:', response ? response.message : '未知错误');
      }
    } catch (error) {
      console.error('跳转失败:', error);
    }
  }

  /**
   * 填充银行卡表单
   */
  async fillCardForm() {
    try {
      console.log('🔄 准备银行卡填充数据...');

      // 设置Faker.js语言
      faker.locale = 'en';

      // 生成美国州缩写
      const state = faker.address.stateAbbr();

      // 获取BIN并生成卡号
      const bin = this.getSelectedBin();
      let cardInfo;

      try {
        cardInfo = generateCardInfo(bin);
      } catch (error) {
        console.error('❌ 生成卡号失败:', error.message);
        alert(`生成卡号失败:\n${error.message}\n\n请检查BIN是否正确。`);
        return;
      }

      // 生成完整的表单数据
      const formData = {
        // 银行卡信息
        cardNumber: cardInfo.cardNumber,
        expiryDate: cardInfo.expiryDate,
        cvc: cardInfo.cvc,
        
        // 个人信息
        fullName: faker.name.findName(),
        
        // 地址信息
        country: 'US',
        province: state,
        city: faker.address.city(),
        address: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        postalCode: faker.address.zipCodeByState(state)
      };

      // 输出日志
      const timestamp = new Date().toLocaleString('zh-CN');
      const cardBrand = cardInfo.cardBrand || 'Unknown';

      console.log(`=== 【${timestamp}】生成的银行卡信息 ===`);
      console.log('💳 支付方式: 银行卡');
      console.log('👤 用户姓名:', formData.fullName);
      console.log('💳 银行卡号:', formData.cardNumber, `(BIN: ${bin})`);
      console.log('🏷️ 卡品牌:', cardBrand);
      console.log('🔐 校验算法: Luhn');
      console.log('📅 有效期:', formData.expiryDate);
      console.log('🔒 CVC/CVV:', formData.cvc);
      console.log('🌍 国家:', formData.country);
      console.log('🏛️ 州/省:', formData.province);
      console.log('🏙️ 城市:', formData.city);
      console.log('🏠 地址第1行:', formData.address);
      console.log('🏠 地址第2行:', formData.addressLine2);
      console.log('📮 邮政编码:', formData.postalCode);
      console.log('=======================================');

      // 发送到background处理
      console.log('📤 发送消息到background处理银行卡填充...');
      
      const response = await chrome.runtime.sendMessage({
        action: 'fillCardForm',
        data: formData
      });

      if (response && response.success) {
        console.log('✅', response.message);
        console.log('💡 提示：填充过程将在后台继续执行，即使关闭此弹窗也不会中断');
      } else {
        console.error('填充失败:', response ? response.message : '未知错误');
      }

    } catch (error) {
      console.error('银行卡填充失败:', error);
      
      if (typeof faker === 'undefined') {
        console.log('Faker.js未正确加载，请检查文件路径', 'error');
      }
    }
  }
}

// 页面加载完成后初始化
$(document).ready(() => {
  new AutoFillManager();
});

