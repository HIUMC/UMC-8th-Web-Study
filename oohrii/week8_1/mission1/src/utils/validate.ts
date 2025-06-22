export type UserSignInformation = {
  email: string;
  password: string;
}

function validateUser(value: UserSignInformation){
  const errors={
      email: '',
      password: '' 
  }

  if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value.email,))
  {
      errors.email='올바른 이메일 아님';
  }

  if(!(value.password.length >= 8 && value.password.length <= 20)){
      errors.password='비밀번호는 8자 이상 20자 이하로 입력하세요';
  }

  return errors;


}

function validateSignin(value: UserSignInformation){
  return validateUser(value);
}

export {validateSignin};