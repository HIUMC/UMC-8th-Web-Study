import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email: '' , password : '' } 식으로 들어옴
  validate: (values: T) => Record<keyof T, string>; // 값이 올바른지 check 함.
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  // values = {email, password}
  const [values, setValues] = useState<T>(initialValue);

  // key 값은 문자열 ("email", "password") / value 값은 boolean
  // email = ture , passwor = false 처럼 값이 들어왔는 지만 확인하는 그런 거군요
  const [touched, setTouched] = useState<Record<string, boolean>>();

  // 에러 message 를 주는 함수
  // ex) email 인데, @ 가 없다면 ? => 이메일은 반드시 @ 를 포함해야합니다.
  const [errors, setErrors] = useState<Record<string, string>>();

  // 객체의 값 업데이트 ,,
  // 사용자가 입력 값을 바꿀 때 실행되는 함수 ..
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 기존 입력 값 유지
      [name]: text,
    });
  };

  const handleBulr = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLAreaElement>) => {
      handleChange(
        name,
        (e.target as HTMLInputElement | HTMLTextAreaElement).value
      );
    };
    const onBlur = () => handleBulr(name);
    return { value, onChange, onBlur };
  };

  // values 가 변경 될 때마다 에러 검증 로직 실행
  useEffect(() => {
    const newErrors: Record<keyof T, string> = validate(values);
    setErrors(newErrors);
  }, [validate, values]);
  return { values, errors, touched, getInputProps };
}

export default useForm;
