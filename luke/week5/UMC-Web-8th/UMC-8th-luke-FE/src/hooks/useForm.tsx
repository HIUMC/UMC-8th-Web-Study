import { useEffect, useState } from 'react'; 

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>; // 각 필드의 에러 메시지
}

export function useForm<T>({ initialValue, validate }: UseFormProps<T>){
    const [values, setValues] = useState<T>(initialValue);
    const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({}); // 각 필드의 터치 여부
    const [errors, setErrors] = useState<Partial<Record<string, string>>>({}); // 각 필드의 에러 메시지

    const handleChange = (name : keyof T , text: string) => {
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
    }
    
    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(name, e.target.value);
        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    };

    useEffect(() => {
        const newerrors = validate(values);
        setErrors(newerrors);
    },[values,validate]);    

    return {
      values,
      errors,
      touched,
      getInputProps,
      isValid: Object.keys(errors).length === 0,
    };
}

export default useForm;