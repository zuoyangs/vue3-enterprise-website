import type { ValidationRule, ValidationResult } from '@/types/common';

// 手机号验证
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^1[3-9]\d{9}$/;
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('手机号不能为空');
  } else if (!phoneRegex.test(phone)) {
    errors.push('请输入正确的手机号格式');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// 邮箱验证
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors: string[] = [];
  
  if (!email) {
    errors.push('邮箱不能为空');
  } else if (!emailRegex.test(email)) {
    errors.push('请输入正确的邮箱格式');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// 姓名验证
export function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('姓名不能为空');
  } else if (name.length < 2) {
    errors.push('姓名长度不能少于2个字符');
  } else if (name.length > 20) {
    errors.push('姓名长度不能超过20个字符');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// 通用字段验证
export function validateField(value: string, rules: ValidationRule[]): ValidationResult {
  const errors: string[] = [];
  
  for (const rule of rules) {
    if (rule.required && !value) {
      errors.push(rule.message);
      break;
    }
    
    if (value && rule.minLength && value.length < rule.minLength) {
      errors.push(rule.message);
    }
    
    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors.push(rule.message);
    }
    
    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.message);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// 表单整体验证
export function validateForm(formData: Record<string, any>, rules: Record<string, ValidationRule[]>): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    results[field] = validateField(formData[field] || '', fieldRules);
  }
  
  return results;
}

// 检查表单是否通过验证
export function isFormValid(validationResults: Record<string, ValidationResult>): boolean {
  return Object.values(validationResults).every(result => result.isValid);
}