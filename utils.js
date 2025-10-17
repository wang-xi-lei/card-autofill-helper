/**
 * 银行卡生成工具库
 * 包含Luhn算法验证、BIN验证、卡号生成等功能
 */

// ============= 辅助函数 =============

/**
 * 延迟函数
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 稳健的延迟函数（确保至少延迟指定时间）
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise}
 */
async function robustSleep(ms) {
  const startTime = Date.now();
  const endTime = startTime + ms;
  
  while (Date.now() < endTime) {
    await new Promise(resolve => 
      setTimeout(resolve, Math.min(100, endTime - Date.now()))
    );
  }
}

// ============= Luhn算法 =============

/**
 * 计算Luhn校验位
 * @param {string} cardNumber - 不含校验位的卡号
 * @returns {string} 校验位
 */
function calculateLuhnCheckDigit(cardNumber) {
  let sum = 0;
  let shouldDouble = true;
  
  // 从右往左遍历
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

/**
 * 验证卡号是否通过Luhn校验
 * @param {string} cardNumber - 完整卡号
 * @returns {boolean}
 */
function isValidLuhn(cardNumber) {
  let sum = 0;
  let shouldDouble = false;
  
  // 从右往左遍历
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
}

/**
 * 计算校验位（对外接口）
 * @param {string} cardNumber - 不含校验位的卡号
 * @returns {string}
 */
function calculateCheckDigit(cardNumber) {
  return calculateLuhnCheckDigit(cardNumber);
}

/**
 * 验证卡号（对外接口）
 * @param {string} cardNumber - 完整卡号
 * @returns {boolean}
 */
function isValidCardNumber(cardNumber) {
  return isValidLuhn(cardNumber);
}

// ============= BIN验证 =============

/**
 * MII（主要行业标识符）定义
 */
const MII_DEFINITIONS = {
  '0': 'ISO/TC 68 and other industry assignments',
  '1': 'Airlines',
  '2': 'Airlines and other future industry assignments',
  '3': 'Travel and Entertainment (American Express, Diners Club, JCB, etc.)',
  '4': 'Banking and Financial (Visa)',
  '5': 'Banking and Financial (MasterCard)',
  '6': 'Merchandising and Banking/Financial (Discover, UnionPay)',
  '7': 'Petroleum and other future industry assignments',
  '8': 'Healthcare, Telecommunications and other future industry assignments',
  '9': 'National assignment'
};

/**
 * 有效的BIN范围定义
 */
const VALID_BIN_RANGES = {
  'Visa': [
    { start: '4', length: 1 }
  ],
  'MasterCard': [
    { start: '51', end: '55' },
    { start: '2221', end: '2720' }
  ],
  'American Express': [
    { start: '34', length: 2 },
    { start: '37', length: 2 }
  ],
  'Diners Club': [
    { start: '36', length: 2 },
    { start: '38', length: 2 },
    { start: '300', end: '305' },
    { start: '309', length: 3 }
  ],
  'Discover': [
    { start: '6011', length: 4 },
    { start: '622126', end: '622925' },
    { start: '644', end: '649' },
    { start: '65', length: 2 }
  ],
  'JCB': [
    { start: '3528', end: '3589' }
  ],
  'UnionPay': [
    { start: '62', length: 2 }
  ]
};

/**
 * 验证BIN格式
 * @param {string} bin - BIN码
 * @returns {Object} 验证结果
 */
function validateBinFormat(bin) {
  const binStr = bin.toString().trim();
  
  // 长度检查
  if (!binStr || binStr.length < 4) {
    return {
      valid: false,
      error: 'BIN长度至少需要4位数字',
      code: 'BIN_TOO_SHORT'
    };
  }
  
  if (binStr.length > 8) {
    return {
      valid: false,
      error: 'BIN长度不应超过8位数字',
      code: 'BIN_TOO_LONG'
    };
  }
  
  // 格式检查
  if (!/^\d+$/.test(binStr)) {
    return {
      valid: false,
      error: 'BIN只能包含数字',
      code: 'BIN_INVALID_CHARS'
    };
  }
  
  // MII检查
  const mii = binStr[0];
  if (!MII_DEFINITIONS[mii]) {
    return {
      valid: false,
      error: `无效的主要行业标识符（MII）: ${mii}`,
      code: 'INVALID_MII'
    };
  }
  
  // 银行类别检查
  if (!['3', '4', '5', '6'].includes(mii)) {
    return {
      valid: false,
      error: `MII ${mii} 不属于银行金融类别，应该是3、4、5或6开头`,
      code: 'NON_BANKING_MII',
      miiType: MII_DEFINITIONS[mii]
    };
  }
  
  return {
    valid: true,
    mii: mii,
    miiType: MII_DEFINITIONS[mii],
    binLength: binStr.length
  };
}

/**
 * 验证BIN范围
 * @param {string} bin - BIN码
 * @returns {Object} 验证结果
 */
function validateBinRange(bin) {
  const binStr = bin.toString();
  let matchedBrands = [];
  
  for (const [brandName, ranges] of Object.entries(VALID_BIN_RANGES)) {
    for (const range of ranges) {
      // 精确长度匹配
      if (range.length) {
        if (binStr.startsWith(range.start)) {
          matchedBrands.push(brandName);
          break;
        }
      } 
      // 范围匹配
      else if (range.end) {
        const prefix = binStr.substring(0, range.start.length);
        const startNum = parseInt(range.start);
        const endNum = parseInt(range.end);
        const prefixNum = parseInt(prefix);
        
        if (prefixNum >= startNum && prefixNum <= endNum) {
          matchedBrands.push(brandName);
          break;
        }
      }
    }
  }
  
  if (matchedBrands.length > 0) {
    return {
      valid: true,
      matchedBrands: matchedBrands,
      primaryBrand: matchedBrands[0]
    };
  }
  
  return {
    valid: false,
    error: 'BIN不匹配任何已知的银行卡品牌范围',
    code: 'UNKNOWN_BIN_RANGE'
  };
}

/**
 * 完整的BIN验证
 * @param {string} bin - BIN码
 * @returns {Object} 验证结果
 */
function validateBin(bin) {
  const binStr = bin.toString().trim();
  console.log(`\n🔍 开始校验BIN: ${binStr}`);
  
  // 格式验证
  const formatResult = validateBinFormat(binStr);
  if (!formatResult.valid) {
    console.error(`❌ BIN格式校验失败: ${formatResult.error}`);
    return formatResult;
  }
  
  console.log('✅ BIN格式校验通过');
  console.log(`   - MII: ${formatResult.mii} (${formatResult.miiType})`);
  console.log(`   - BIN长度: ${formatResult.binLength}位`);
  
  // 范围验证
  const rangeResult = validateBinRange(binStr);
  if (!rangeResult.valid) {
    console.warn(`⚠️ BIN范围校验失败: ${rangeResult.error}`);
    console.warn('   该BIN可能不是常见银行卡品牌，但仍可尝试生成');
    return {
      valid: true,
      warning: rangeResult.error,
      mii: formatResult.mii,
      miiType: formatResult.miiType,
      isUnknownBrand: true
    };
  }
  
  console.log('✅ BIN范围校验通过');
  console.log(`   - 匹配品牌: ${rangeResult.matchedBrands.join(', ')}`);
  console.log(`   - 主要品牌: ${rangeResult.primaryBrand}`);
  
  return {
    valid: true,
    mii: formatResult.mii,
    miiType: formatResult.miiType,
    binLength: formatResult.binLength,
    matchedBrands: rangeResult.matchedBrands,
    primaryBrand: rangeResult.primaryBrand
  };
}

// ============= 卡品牌检测 =============

/**
 * 根据BIN检测卡品牌
 * @param {string} bin - BIN码
 * @returns {Object} 卡品牌信息
 */
function detectCardBrand(bin) {
  const binStr = bin.toString();
  
  // Visa: 以4开头
  if (binStr.startsWith('4')) {
    return {
      name: 'Visa',
      length: 16,
      cvvLength: 3
    };
  }
  
  // MasterCard: 51-55 或 2221-2720
  if (/^5[1-5]/.test(binStr)) {
    return {
      name: 'MasterCard',
      length: 16,
      cvvLength: 3
    };
  }
  
  if (binStr.startsWith('2')) {
    if (binStr.length >= 4) {
      const first4 = parseInt(binStr.slice(0, 4), 10);
      if (first4 >= 2221 && first4 <= 2720) {
        return {
          name: 'MasterCard',
          length: 16,
          cvvLength: 3
        };
      }
    }
  }
  
  // American Express: 34 或 37
  if (binStr.startsWith('34') || binStr.startsWith('37')) {
    return {
      name: 'American Express',
      length: 15,
      cvvLength: 4
    };
  }
  
  // UnionPay: 62
  if (binStr.startsWith('62')) {
    return {
      name: 'UnionPay',
      length: 16,
      cvvLength: 3
    };
  }
  
  // Discover: 6011, 644-649, 65
  if (binStr.startsWith('6011') || /^64[4-9]/.test(binStr) || binStr.startsWith('65')) {
    return {
      name: 'Discover',
      length: 16,
      cvvLength: 3
    };
  }
  
  // Diners Club: 36, 38
  if (binStr.startsWith('36') || binStr.startsWith('38')) {
    return {
      name: 'Diners Club',
      length: 14,
      cvvLength: 3
    };
  }
  
  // JCB: 3528-3589
  if (/^35[2-8]/.test(binStr)) {
    return {
      name: 'JCB',
      length: 16,
      cvvLength: 3
    };
  }
  
  // 未知品牌，默认16位
  return {
    name: 'Unknown',
    length: 16,
    cvvLength: 3
  };
}

// ============= 账户号段生成 =============

/**
 * 获取真实的随机数字（使用加权分布）
 * @returns {number} 0-9的数字
 */
function getRealisticRandomDigit() {
  // 真实银行卡号中各数字出现频率略有不同
  const weights = [0.09, 0.10, 0.11, 0.10, 0.10, 0.11, 0.10, 0.09, 0.10, 0.10];
  const random = Math.random();
  
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return i;
    }
  }
  
  return 5; // 默认值
}

/**
 * 生成银行标准账户段
 * @param {number} position - 当前位置
 * @param {string} currentNumber - 当前已生成的号码
 * @param {number} totalLength - 总长度
 * @returns {string} 单个数字
 */
function generateBankStandardAccountSegment(position, currentNumber, totalLength) {
  // 根据位置使用不同的权重分布
  const positionWeights = {
    0: [0.05, 0.15, 0.15, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.05], // 首位避免0和9
    1: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10], // 均匀分布
    'default': [0.08, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.04] // 其他位置
  };
  
  const weights = positionWeights[position] || positionWeights['default'];
  const random = Math.random();
  
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return i.toString();
    }
  }
  
  return '5'; // 默认值
}

/**
 * 加权随机选择
 * @param {Array<number>} weights - 权重数组
 * @returns {number} 选中的索引
 */
function weightedRandom(weights) {
  const random = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return i;
    }
  }
  
  return weights.length - 1;
}

/**
 * 生成高级账户段（结合多种策略）
 * @param {number} length - 需要生成的长度
 * @param {string} bin - BIN前缀
 * @returns {string} 账户段
 */
function generateAdvancedAccountSegment(length, bin) {
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    let accountSegment = '';
    
    // 基于BIN生成部分有规律的数字
    const binHash = parseInt(bin.slice(-4)) % 1000;
    const pattern = String(Math.floor(binHash / 10) % 100).padStart(2, '0');
    
    // 选择生成策略：70%标准，20%模式，10%完全随机
    const strategyWeights = [0.7, 0.2, 0.1];
    const strategy = weightedRandom(strategyWeights);
    
    // 前两位可能包含模式
    if (length >= 2) {
      const variation = Math.floor(Math.random() * 10);
      accountSegment += String((parseInt(pattern[0]) + variation) % 10);
      accountSegment += String((parseInt(pattern[1]) + Math.floor(Math.random() * 3)) % 10);
    }
    
    // 生成剩余位数
    const remaining = length - accountSegment.length;
    for (let i = 0; i < remaining; i++) {
      const position = accountSegment.length;
      
      if (strategy === 0) {
        // 标准银行生成
        accountSegment += generateBankStandardAccountSegment(position, accountSegment, length);
      } else if (strategy === 1) {
        // 模式生成
        if (position === 2) {
          accountSegment += weightedRandom([0.1, 0.1, 0.3, 0.3, 0.1, 0.05, 0.05, 0, 0, 0]);
        } else {
          accountSegment += generateBankStandardAccountSegment(position, accountSegment, length);
        }
      } else {
        // 随机生成（但前4位保持质量）
        if (position < 4) {
          accountSegment += String(Math.floor(Math.random() * 10));
        } else {
          accountSegment += generateBankStandardAccountSegment(position, accountSegment, length);
        }
      }
    }
    
    return accountSegment;
    attempts++;
  }
  
  // 如果循环结束仍未返回，使用简单方法
  let fallback = '';
  for (let i = 0; i < length; i++) {
    fallback += generateBankStandardAccountSegment(i, fallback, length);
  }
  return fallback;
}

// ============= 有效期和CVV生成 =============

/**
 * 生成真实的有效期
 * @returns {Object} {expMonth, expYear}
 */
function generateRealisticExpiryDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  // 随机3-5年后过期
  const yearsToAdd = Math.floor(Math.random() * 3) + 3;
  let expYear = currentYear + yearsToAdd;
  
  // 70%的概率选择季度末月份（3,6,9,12）
  let expMonth;
  if (Math.random() < 0.7) {
    const quarterMonths = [3, 6, 9, 12];
    expMonth = quarterMonths[Math.floor(Math.random() * quarterMonths.length)];
  } else {
    expMonth = Math.floor(Math.random() * 12) + 1;
  }
  
  // 确保不会过期
  if (expYear === currentYear && expMonth <= currentMonth) {
    expYear++;
  }
  
  return {
    expMonth: String(expMonth).padStart(2, '0'),
    expYear: String(expYear).slice(-2)
  };
}

/**
 * 生成CVV/CVC码
 * @param {string} bin - BIN前缀
 * @param {boolean} isAmex - 是否为美国运通卡
 * @param {number} cvvLength - CVV长度
 * @returns {string} CVV码
 */
function generateCVV(bin, isAmex, cvvLength = 3) {
  if (isAmex || cvvLength === 4) {
    // 4位CVV（美国运通卡）：1000-9999
    return String(Math.floor(Math.random() * 9000) + 1000);
  } else {
    // 3位CVV：避免连号
    let cvv;
    do {
      cvv = Math.floor(Math.random() * 900) + 100;
      const cvvStr = String(cvv);
      // 避免三位相同
      if (cvvStr[0] !== cvvStr[1] || cvvStr[1] !== cvvStr[2]) {
        break;
      }
    } while (true);
    
    return String(cvv);
  }
}

// ============= 卡号格式化 =============

/**
 * 格式化卡号（添加空格）
 * @param {string} cardNumber - 卡号
 * @param {boolean} isAmex - 是否为美国运通卡
 * @returns {string} 格式化后的卡号
 */
function formatCardNumber(cardNumber, isAmex) {
  if (isAmex) {
    // 美国运通卡：4-6-5格式
    return cardNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    // 其他卡：4-4-4-4格式
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}

// ============= 主要生成函数 =============

/**
 * 生成完整的银行卡信息
 * @param {string} bin - BIN前缀
 * @returns {Object} {cardNumber, expiryDate, cvc, cardBrand}
 */
function generateCardInfo(bin) {
  if (!bin || bin.length === 0) {
    throw new Error('必须提供BIN前缀');
  }
  
  // 清理BIN输入
  const cleanBin = bin.toString().replace(/\D/g, '');
  
  // 验证BIN
  const binValidation = validateBin(cleanBin);
  if (!binValidation.valid) {
    throw new Error(`BIN校验失败: ${binValidation.error} (错误码: ${binValidation.code})`);
  }
  
  if (binValidation.warning) {
    console.warn(`⚠️ BIN校验警告: ${binValidation.warning}`);
  }
  
  // 检测卡品牌
  const cardBrand = detectCardBrand(cleanBin);
  const cardLength = cardBrand.length;
  const isAmex = cardBrand.name === 'American Express';
  
  // 计算需要生成的账户段长度
  const accountSegmentLength = cardLength - cleanBin.length;
  
  if (accountSegmentLength <= 1) {
    throw new Error(`BIN长度过长，无法生成${cardLength}位卡号`);
  }
  
  // 尝试生成有效卡号
  let attempts = 0;
  const maxAttempts = 50;
  let result = null;
  
  while (attempts < maxAttempts) {
    try {
      // 生成账户段（不含校验位）
      const accountLength = accountSegmentLength - 1; // 预留校验位
      let cardWithoutCheck = cleanBin;
      
      if (accountLength > 0) {
        const accountSegment = generateAdvancedAccountSegment(accountLength, cleanBin);
        cardWithoutCheck += accountSegment;
      }
      
      // 计算并添加校验位
      const checkDigit = calculateCheckDigit(cardWithoutCheck);
      const fullCardNumber = cardWithoutCheck + checkDigit;
      
      // 验证长度
      if (fullCardNumber.length !== cardLength) {
        console.error(`❌ 卡号长度错误: 期望${cardLength}位，实际${fullCardNumber.length}位`, fullCardNumber);
        console.error(`BIN长度: ${cleanBin.length}, 账户段长度: ${accountLength}, 校验位: 1位`);
        throw new Error(`生成的卡号长度不正确: 期望${cardLength}位，实际${fullCardNumber.length}位`);
      }
      
      // 验证Luhn
      if (!isValidCardNumber(fullCardNumber)) {
        console.warn('生成的卡号未通过Luhn校验:', fullCardNumber);
        attempts++;
        continue;
      }
      
      // 生成有效期和CVV
      const { expMonth, expYear } = generateRealisticExpiryDate();
      const cvc = generateCVV(cleanBin, isAmex, cardBrand.cvvLength);
      
      result = {
        cardNumber: formatCardNumber(fullCardNumber, isAmex),
        expiryDate: `${expMonth}/${expYear}`,
        cvc: cvc,
        cardBrand: cardBrand.name
      };
      
      break;
    } catch (error) {
      console.error(`生成卡号尝试 ${attempts + 1} 失败:`, error.message);
    }
    
    attempts++;
  }
  
  if (result) {
    return result;
  }
  
  throw new Error('无法生成符合要求的高质量卡号，请尝试更换BIN或稍后重试');
}

