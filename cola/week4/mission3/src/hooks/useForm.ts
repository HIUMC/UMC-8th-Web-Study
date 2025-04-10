import { useState, useEffect } from "react";

interface UseFormProps<T> {
  initialValue: T; // { email: '', password : '' }
  // 값이 올바른지 검증하는 함수.
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  // 사용자가 입력값을 바꿀 때 실행되는 함수.
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  // 사용자가 입력값을 터치할 때 실행되는 함수.
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 입력값을 받아오는 함수.
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검사를 실행하는 함수.
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [values, validate]);

  return { values, touched, errors, getInputProps };
}

export default useForm;
