import { ChangeEvent, useState, useEffect } from "react";
interface UseFormProps<T> {
  initialValue: T; //{email'', password:""}
  //r값이 올바 른지 검증하는 함수가 될 것임.
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [errors, setErrors] = useState<Record<string, string>>();

  //value값들을 객체형식으로 관ㄹ리하는 방법 -> name 을 넣어두고 handleChange를 만들기.

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지 (기존 값 유지하기 위함)
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //이메일 인풋과 password인풋을 통해 속성을 가져올 것임.
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  //values가 변경될 때마다 에러 검증 로직이 실행됨
  //{email}
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
