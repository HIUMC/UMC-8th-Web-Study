export type userSignInformation = {
    email: string;
    password: string;
    passwordConfirm: string;
    name?: string;
}

function validateUser(value: userSignInformation){
    const errors={
        email: '',
        password: '',
        passwordConfirm: '',
    }

    if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value.email,))
    {
        errors.email='이메일 형식을 갖추쇼';
    }

    if(!(value.password.length >= 8 && value.password.length <= 20)){
        errors.password='비밀번호는 8자 이상 20자 이하로 입력하쇼';
    }
    
    if(!(value.passwordConfirm===value.password)){
        errors.passwordConfirm='비밀번호가 일치하지 않소';
    }

    return errors;


}

function validateSignin(value: userSignInformation){
    return validateUser(value);
}

export {validateSignin};