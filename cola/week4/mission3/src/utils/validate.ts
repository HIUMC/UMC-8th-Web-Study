export type UserLoginInformation = {
  email: string;
  password: string;
};

export type UserSignUpInformation = UserLoginInformation & {
  passwordCheck: string;
  profile: string;
};

function validateUser(values: UserLoginInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  if (values.password.length < 8 || values.password.length >= 20) {
    errors.password = "비밀번호는 8자 이상 20자 이하여야 합니다.";
  }

  return errors;
}

function validateUserSignUp(values: UserSignUpInformation) {
  const errors = {
    ...validateUser(values),
    passwordCheck: "",
    profile: "",
  };

  if (values.password !== values.passwordCheck) {
    errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
  }

  if (values.profile.length < 2) {
    errors.profile = "프로필 이미지를 선택해주세요.";
  }

  return errors;
}

// 로그인 유효성 검사
export function validateLogin(values: UserLoginInformation) {
  return validateUser(values);
}

// 회원가입 유효성 검사
export function validateSignUp(values: UserSignUpInformation) {
  return validateUserSignUp(values);
}
