export type UserSigninInformation = {
  email: string;
  password: string;
};

function validate(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)) {
    {
      errors.email = "옳바른 이메일 형식이 아닙니다.";
    }
  }

  //password length between 8 and 20
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
  }

  return errors;
}

function validateSignin(values: UserSigninInformation) {
  return validate(values);
}

export { validateSignin };
