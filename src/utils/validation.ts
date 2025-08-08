export const ValidationUtils = {
  email: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  password: (password: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
  },
  
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  nickname: (nickname: string): boolean => {
    return /^.{2,8}$/.test(nickname);
  },

  passwordConfirm: (password: string, passwordConfirm: string): boolean => {
    return password === passwordConfirm;
  }
};

export const ValidationMessages = {
  email: '올바른 이메일 형식을 입력해주세요.',
  password: '비밀번호는 최소 8자리이며, 영문, 숫자, 특수문자를 포함해야 합니다.',
  required: '필수 입력 항목입니다.',
  minLength: (min: number) => `최소 ${min}자 이상 입력해주세요.`,
  maxLength: (max: number) => `최대 ${max}자까지 입력 가능합니다.`,
  nickname: '닉네임은 2자 이상 8자 이하여야 합니다.',
  passwordConfirm: '비밀번호가 일치하지 않습니다.'
};