/**
 * 银行卡自动填充助手 - 后台服务脚本
 * 负责处理页面跳转、脚本注入和表单填充
 */

console.log('Background Service Worker 已启动');

// 导入工具函数
importScripts('utils.js');

/**
 * 扩展安装或更新时触发
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log('扩展已安装或更新');
});

/**
 * 监听来自popup的消息
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background收到消息:', message.action);

  switch (message.action) {
    case 'fillCardForm':
      handleFillCardForm(message.data);
      sendResponse({ success: true, message: '已开始银行卡填充流程' });
      break;

    case 'goToBindPage':
      handleGoToBindPage();
      sendResponse({ success: true, message: '正在跳转到绑卡页面' });
      break;

    default:
      sendResponse({ success: false, message: '未知的操作' });
  }

  // 返回true表示异步响应
  return true;
});

/**
 * 处理银行卡表单填充
 * @param {Object} formData - 表单数据
 */
async function handleFillCardForm(formData) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    console.log('🔄 Background: 开始银行卡填充流程');

    // 第一步：选择银行卡支付方式
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: selectCardPaymentMethod
    });

    // 等待UI更新
    await sleep(1000);

    // 第二步：执行表单填充
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: executeCardFillProcess,
      args: [formData]
    });

    console.log('✅ Background: 银行卡填充脚本已注入，将在页面端独立运行');

  } catch (error) {
    console.error('Background: 银行卡填充失败:', error);
  }
}

/**
 * 处理跳转到绑卡页面
 */
async function handleGoToBindPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) {
      console.error('无法获取当前标签页');
      return;
    }

    // 解析URL并构造dashboard地址
    const url = new URL(tab.url);
    const hostname = url.hostname.replace(/^www\./, '');
    const dashboardUrl = `${url.protocol}//${hostname}/dashboard`;

    // 检查是否已在dashboard页面
    if (tab.url.includes('/dashboard')) {
      console.log('当前已在dashboard页面，开始监听试用按钮...');
      
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: waitForTrialButtonAndClick
      });
    } else {
      console.log('跳转到首页面板: ' + dashboardUrl);
      
      // 跳转到dashboard
      await chrome.tabs.update(tab.id, { url: dashboardUrl });
      
      // 设置页面加载完成后的监听器
      setupTrialButtonListener(tab.id);
    }

  } catch (error) {
    console.error('跳转失败:', error);
  }
}

/**
 * 设置试用按钮监听器
 * @param {number} tabId - 标签页ID
 */
function setupTrialButtonListener(tabId) {
  console.log('设置试用按钮监听器...');

  const listener = (updatedTabId, changeInfo, tab) => {
    if (updatedTabId === tabId && changeInfo.status === 'complete' && tab.url.includes('/dashboard')) {
      console.log('dashboard页面加载完成，开始监听试用按钮...');
      
      // 移除监听器
      chrome.tabs.onUpdated.removeListener(listener);
      
      // 注入脚本
      chrome.scripting.executeScript({
        target: { tabId: updatedTabId },
        func: waitForTrialButtonAndClick
      }).catch(error => {
        console.error('注入脚本失败:', error);
      });
    }
  };

  chrome.tabs.onUpdated.addListener(listener);
}

// ========== 注入到页面的函数 ==========

/**
 * 等待元素出现
 * @param {string} selector - CSS选择器
 * @param {Object} options - 配置选项
 * @returns {Promise<Element|null>}
 */
async function waitForElement(selector, options = {}) {
  const {
    timeout = 30000,
    interval = 200,
    checkVisible = false,
    description = '元素'
  } = options;

  const startTime = Date.now();
  let attempts = 0;

  while (Date.now() - startTime < timeout) {
    attempts++;
    const element = document.querySelector(selector);

    if (element) {
      if (checkVisible) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;
        
        if (isVisible) {
          console.log(`✅ 找到${description}（第${attempts}次尝试，用时${Date.now() - startTime}ms）`);
          return element;
        }
      } else {
        console.log(`✅ 找到${description}（第${attempts}次尝试，用时${Date.now() - startTime}ms）`);
        return element;
      }
    }

    await robustSleep(interval);
  }

  console.log(`⚠️ 超时未找到${description}（尝试了${attempts}次，用时${Date.now() - startTime}ms）`);
  return null;
}

/**
 * 选择银行卡支付方式
 */
async function selectCardPaymentMethod() {
  console.log('\n━━━ 💳 银行卡支付方式选择开始 ━━━');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const robustSleep = async (ms) => {
    const startTime = Date.now();
    const endTime = startTime + ms;
    
    while (Date.now() < endTime) {
      await new Promise(resolve => 
        setTimeout(resolve, Math.min(100, endTime - Date.now()))
      );
    }
  };

  // 等待页面准备
  console.log('⏳ 页面准备中...');
  await robustSleep(300);

  // 查找并点击银行卡支付方式
  console.log('🔍 开始查找银行卡支付方式...');
  
  let cardButton = null;
  let attempts = 0;
  const maxAttempts = 60;

  while (attempts < maxAttempts && !cardButton) {
    attempts++;
    console.log(`查找银行卡支付方式..（第${attempts}次）`);
    
    const button = document.querySelector('button[data-testid=card-accordion-item-button]');
    if (button) {
      cardButton = button;
      console.log(`✅ 找到银行卡支付方式（第${attempts}次尝试）`);
      
      cardButton.click();
      console.log('✅ 已点击银行卡支付方式');
      break;
    }
    
    await robustSleep(500);
  }

  if (!cardButton) {
    console.log(`⚠️ 超时未找到银行卡支付方式（尝试了${attempts}次）`);
    return;
  }

  // 等待UI更新
  await robustSleep(500);

  // 检查并开启年续费
  const yearlySwitch = document.querySelector('.HostedSwitch');
  if (yearlySwitch) {
    if (yearlySwitch.getAttribute('aria-checked') != 'true') {
      yearlySwitch.click();
      console.log('✅ 已开启年续费');
    } else {
      console.log('✅ 年续费已开启');
    }
  }

  // 等待UI更新
  await robustSleep(300);

  // 查找并点击手动输入地址按钮
  console.log('🔍 查找手动输入地址按钮...');
  const manualAddressButton = document.querySelector('.AddressAutocomplete-manual-entry .Button');
  
  if (manualAddressButton) {
    console.log('✅ 找到手动输入地址按钮');
    manualAddressButton.click();
    console.log('✅ 已点击手动输入地址按钮');
  } else {
    console.log('⚠️ 未找到手动输入地址按钮（可能不是首次绑卡）');
  }
}

/**
 * 执行银行卡填充流程
 * @param {Object} formData - 表单数据
 */
function executeCardFillProcess(formData) {
  console.log('💳 开始独立执行银行卡填充流程');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * 自动提交表单
   * @param {Element} submitButton - 提交按钮
   */
  async function autoSubmitForm(submitButton) {
    console.log('🚀 准备自动提交表单...');
    
    let stopped = false;
    let submitted = false;

    // 设置重复点击间隔
    const clickInterval = setInterval(() => {
      if (stopped) {
        clearInterval(clickInterval);
        return;
      }

      submitButton.click();

      // 检查是否出现提交中状态
      const processingLabel = document.querySelector('span[data-testid=submit-button-processing-label]');
      if (processingLabel && processingLabel.getAttribute('aria-hidden') === 'false') {
        clearInterval(clickInterval);
        submitted = true;
        stopped = true;
        console.log('✅ 表单已提交');
      }
    }, 500);

    // 超时停止
    (async () => {
      await sleep(8000);
      if (!submitted) {
        stopped = true;
        clearInterval(clickInterval);
        console.log('⏱️ 提交超时（银行卡方式不自动跳转）');
      }
    })();
  }

  /**
   * 主填充流程
   */
  (async function() {
    try {
      console.log('📋 填充数据:', formData);
      
      await fillCardFields(formData);
      
      console.log('✅ 银行卡填充流程完成（独立执行）');

    } catch (error) {
      console.error('银行卡填充失败:', error);
    }
  })();

  /**
   * 填充银行卡字段
   * @param {Object} data - 表单数据
   */
  async function fillCardFields(data) {
    console.log('💳 银行卡填充模式 - 开始填充字段');

    // 字段选择器映射
    const fieldSelectors = {
      cardNumber: ['input[name=cardNumber]'],
      expiryDate: ['input[name="cardExpiry"]'],
      cvc: ['input[name="cardCvc"]'],
      fullName: ['input[name="billingName"]'],
      country: ['select[name="billingCountry"]'],
      province: ['select[name="billingAdministrativeArea"]'],
      city: ['input[name="billingLocality"]'],
      address: ['input[name="billingAddressLine1"]'],
      addressLine2: ['input[name="billingAddressLine2"]'],
      postalCode: ['input[name="billingPostalCode"]']
    };

    /**
     * 尝试填充字段
     * @param {Array<string>} selectors - 选择器数组
     * @param {string} value - 要填充的值
     * @returns {boolean} 是否成功
     */
    function tryFillField(selectors, value) {
      if (!value) return false;

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);

        for (const element of elements) {
          if (element) {
            // 处理select元素
            if (element.tagName.toLowerCase() === 'select') {
              // 先尝试精确匹配
              const exactOption = element.querySelector(`option[value="${value}"]`);
              if (exactOption) {
                element.value = value;
                element.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`✅ 成功设置select元素: ${selector} = ${value}`);
                return true;
              } else {
                // 尝试模糊匹配
                const options = element.querySelectorAll('option');
                for (const option of options) {
                  const optionText = option.textContent.toLowerCase();
                  const optionValue = option.value.toLowerCase();

                  // 特殊处理美国
                  if (value === 'US') {
                    if (optionValue === 'us' || optionValue === 'usa' || 
                        optionValue === 'united states' || 
                        optionText.includes('united states') || 
                        optionText.includes('america') || 
                        optionText.includes('美国') ||
                        optionValue === 'united_states') {
                      element.value = option.value;
                      element.dispatchEvent(new Event('change', { bubbles: true }));
                      console.log(`✅ 通过美国特殊匹配设置select元素: ${selector} = ${option.value}`);
                      return true;
                    }
                  }

                  // 通用模糊匹配
                  if (optionText.includes(value.toLowerCase()) || 
                      optionValue.includes(value.toLowerCase())) {
                    element.value = option.value;
                    element.dispatchEvent(new Event('change', { bubbles: true }));
                    console.log(`✅ 通过文本匹配设置select元素: ${selector} = ${option.value}`);
                    return true;
                  }
                }

                console.log(`❌ 未找到匹配的option: ${selector}, 查找值: ${value}`);
              }
            } 
            // 处理input元素
            else {
              element.value = value;

              // 触发多个事件确保React等框架能捕获
              const events = ['input', 'change', 'blur', 'keyup'];
              events.forEach(eventType => {
                element.dispatchEvent(new Event(eventType, { bubbles: true }));
              });

              // 特殊处理React的value tracker
              if (element._valueTracker) {
                element._valueTracker.setValue('');
              }

              console.log(`✅ 成功设置input元素: ${selector} = ${value}`);
              return true;
            }
          }
        }
      }

      return false;
    }

    // 定义字段填充顺序
    const fieldOrder = [
      'cardNumber',
      'expiryDate',
      'cvc',
      'fullName',
      'country',
      'province',
      'city',
      'postalCode',
      'address',
      'addressLine2'
    ];

    let successCount = 0;
    const fillResults = {};

    /**
     * 递归填充字段
     * @param {number} index - 当前字段索引
     */
    async function fillFieldsRecursively(index) {
      if (index >= fieldOrder.length) {
        // 所有字段填充完成
        const timestamp = new Date().toLocaleString('zh-CN');
        console.log(`=== 【${timestamp}】银行卡表单填入结果 ===`);
        console.log(`✅ 成功填入: ${successCount} 个字段`);
        console.log('📊 详细结果:', fillResults);

        // 等待一下确保所有字段都已更新
        await sleep(500);

        // 如果成功填充至少8个字段，尝试自动提交
        if (Object.values(fillResults).filter(v => v === true).length >= 8) {
          const submitButton = document.querySelector('button[data-testid=hosted-payment-submit-button]');
          if (submitButton) {
            autoSubmitForm(submitButton);
          }
        }

        // 显示成功提示
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4CAF50;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          z-index: 999999;
          font-family: Arial, sans-serif;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        toast.textContent = `💳 已填入 ${successCount} 个银行卡字段`;
        document.body.appendChild(toast);

        await sleep(3000);
        if (toast.parentNode) {
          toast.remove();
        }

        return;
      }

      // 填充当前字段
      const fieldName = fieldOrder[index];
      let fieldValue = data[fieldName];

      // 特殊处理：卡号去除空格
      if (fieldName === 'cardNumber' && typeof fieldValue === 'string') {
        fieldValue = fieldValue.replace(/\s/g, '');
      }

      // 字段中文名称
      const fieldLabels = {
        'cardNumber': '卡号',
        'expiryDate': '有效期',
        'cvc': 'CVC',
        'fullName': '持卡人',
        'country': '国家',
        'province': '州/省',
        'city': '城市',
        'postalCode': '邮编',
        'address': '地址第一行',
        'addressLine2': '地址第二行'
      };

      console.log(`⏳ [${index + 1}/${fieldOrder.length}] 正在填充: ${fieldLabels[fieldName]} (${fieldName})`);

      if (fieldValue && fieldSelectors[fieldName]) {
        const success = tryFillField(fieldSelectors[fieldName], fieldValue);
        fillResults[fieldName] = success;

        if (success) {
          successCount++;
          console.log(`✅ ${fieldLabels[fieldName]} 填充成功: ${fieldValue}`);
        } else {
          console.log(`❌ ${fieldLabels[fieldName]} 填充失败`);
        }
      } else {
        fillResults[fieldName] = false;
        console.log(`⚠️ ${fieldLabels[fieldName]} 无数据或无选择器`);
      }

      // 短暂延迟，然后填充下一个字段
      await sleep(100);
      await fillFieldsRecursively(index + 1);
    }

    // 开始填充
    console.log('⏳ 等待0.1秒后开始填充银行卡信息...');
    await sleep(100);
    console.log('🎯 开始按顺序填充银行卡信息...');
    await fillFieldsRecursively(0);
  }
}

/**
 * 等待试用按钮并点击
 */
async function waitForTrialButtonAndClick() {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const robustSleep = async (ms) => {
    const startTime = Date.now();
    const endTime = startTime + ms;
    
    while (Date.now() < endTime) {
      await new Promise(resolve => 
        setTimeout(resolve, Math.min(100, endTime - Date.now()))
      );
    }
  };

  console.log('🔍 开始查找试用按钮...');
  console.log('当前URL:', window.location.href);

  const startTime = Date.now();
  let trialButton = null;
  let attempts = 0;
  const maxAttempts = 120;

  while (attempts < maxAttempts && !trialButton) {
    attempts++;
    console.log(`查找试用按钮..（第${attempts}次）`);

    // 使用XPath查找包含文本的span
    const spanElement = document.evaluate(
      "//span[text()='Start 7-day trial']",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (spanElement) {
      trialButton = spanElement;
      console.log(`✅ 找到试用按钮（第${attempts}次尝试）`);
      
      trialButton.click();
      console.log('✅ 已点击试用按钮，即将跳转到绑卡页面');
      return true;
    }

    await robustSleep(500);
  }

  if (!trialButton) {
    console.log(`⚠️ 未找到试用按钮（尝试了${attempts}次，用时${Date.now() - startTime}ms）`);
    return false;
  }
}

