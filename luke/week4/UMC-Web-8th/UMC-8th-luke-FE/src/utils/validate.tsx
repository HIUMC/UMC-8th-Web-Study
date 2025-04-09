export type UserSigninInformation = {
  email: string;
  password: string;
};

const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 최소 하나의 문자와 숫자 포함

export function validateUser(values: UserSigninInformation): Partial<Record<keyof UserSigninInformation, string>> {
  const errors: Partial<Record<keyof UserSigninInformation, string>> = {};

  if (!values.email) {
    errors.email = "이메일을 입력하세요."
  } else if (!regEmail.test(values.email)) {
    errors.email = "유효한 이메일 형식이 아닙니다.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력하세요.";
  } else if (!regPassword.test(values.password)) {
    errors.password = "비밀번호는 최소 8자, 문자와 숫자를 포함해야 합니다.";
  }

  return errors;
}
