import { ChangeEvent, useEffect, useState } from "react";

interface UseFormsProps<T>{ 
    initialValues: T; 
    validate?: (values: T) => Record<keyof T, string>; 
}

function useForm<T>({initialValues, validate}: UseFormsProps<T>){
    const [values, setValues] = useState<T>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({}); 
    const [errors, setErrors] = useState<Record<string, string>>({});

  
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values,
            [name]: text, 
        })
    }

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true
        })
    }

    const getInputProps = (name:keyof T)=>{
        const value=values[name];
        const onChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
            handleChange(name, e.target.value);
        }
        const onBlur = () => handleBlur(name); 

        return {value, onChange, onBlur} 
    }

   
    useEffect(()=>{
        if (validate) {
            const newErrors = validate(values);
            setErrors(newErrors);
        }
    }, [validate, values])

    return {values, errors, touched, getInputProps}
}

export default useForm;