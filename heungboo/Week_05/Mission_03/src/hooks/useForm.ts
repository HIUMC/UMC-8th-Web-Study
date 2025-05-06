import { ChangeEvent, useEffect, useState } from "react";

interface useFormProps<T> {
  initialValues: T; // 로그인 = { email: '', password: '' }
  validate: (values: T) => Record<keyof T, string>; // 올바른지 확인하는 함수
}

function useForm<T>({ initialValues, validate }: useFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  // 사용자가 입력을 바꿀 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 인풋, 비밀번호 인풋 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];

    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, e.target.value);
    };
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증 로직 실행
  // {email: '', password: ''} => {email: '이메일 형식이 아닙니다.', password: ''}

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 상태 업데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
