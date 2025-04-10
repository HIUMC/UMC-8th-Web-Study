export type UserLoginInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserLoginInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  if (values.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다.";
  }

  return errors;
}

// 로그인 유효성 검사
function validateLogin(values: UserLoginInformation) {
  return validateUser(values);
}

export { validateLogin };
