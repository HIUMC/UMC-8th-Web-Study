import { ChangeEvent, useEffect, useState } from "react";

interface UseFormsProps<T>{ 
    initialValues: T; //{email:'', password:''}
    validate?: (values: T) => Record<keyof T, string>; //값이 올바른 지 검증해주는 함수
}

function useForm<T>({initialValues, validate}: UseFormsProps<T>){
    const [values, setValues] = useState<T>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({}); //그 아마 입력창 눌러지면 입력하라고 메세지 뜨는 거 때문에 설정해둔듯
    const [errors, setErrors] = useState<Record<string, string>>({});//이메일 형식 같은 거 맞는지 확인할라고 ㅇㅇ

    //객체 값 업데이트하는 거를 여기다가... todo만들기에서 했을 것임...
    //사용자가 입력값을 바꿀 때 실행되는 함수수
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, //불변성 유지 == 기존값들은 유지
            [name]: text, //입력된 값은 바꿔주는 것이다...
        })
    }

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true
        })
    }

    //속성들을 가져오기
    const getInputProps = (name:keyof T)=>{
        const value=values[name];
        const onChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
            handleChange(name, e.target.value);
        }
        const onBlur = () => handleBlur(name); 

        return {value, onChange, onBlur} // input에 얘네들을 넣어줄 수 있음 근데 이게 머 어쩌구 드르렁...
    }

    //value 변경될 때 마다 에러 검증 로직이 실행됨
    useEffect(()=>{
        const newErrors=validate(values);
        setErrors(newErrors); //오류 메세지 업데이트
    }, [validate, values])

    return {values, errors, touched, getInputProps}
}

export default useForm;