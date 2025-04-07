export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  // 비밀번호 8자 28자 사이
  if (!(values.password.length >= 8 && values.password.length < 28)) {
    errors.password = "비밀번호는 8-28자 사이로 입력해 주세요.";
  }
  return errors;
}

// 로그인 유효성 검사
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin };
