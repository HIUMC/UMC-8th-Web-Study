import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

// 폼 값 타입 (문자열 키와 문자열 값을 가짐)
type FormValues = Record<string, string>;

// 폼 에러 타입 (문자열 키와 문자열 또는 null 값을 가짐)
type FormErrors = Record<string, string | null>;

// 유효성 검사 규칙 타입
type ValidationRules<T extends FormValues> = {
  [K in keyof T]?: (value: string, values: T) => string | null;
};

// useForm 훅의 반환 타입
interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean; // 전체 폼 유효성 (모든 필드 유효)
  isFieldValid: (fieldName: keyof T) => boolean; // 특정 필드 유효성
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  setFieldValue: (name: keyof T, value: string) => void; // 특정 필드 값 설정 함수 추가
}

/**
 * 폼 상태 관리 및 유효성 검사를 위한 커스텀 훅
 * @param initialValues 폼 초기 값
 * @param validationRules 유효성 검사 규칙
 */
const useForm = <T extends FormValues>(
  initialValues: T,
  validationRules?: ValidationRules<T>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
     Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: false }), {} as Record<keyof T, boolean>)
  );


  // 특정 필드의 유효성 검사
  const validateField = useCallback((name: keyof T, value: string, currentValues: T): string | null => {
    if (validationRules?.[name]) {
      return validationRules[name]!(value, currentValues);
    }
    return null;
  }, [validationRules]);

  // 폼 전체 유효성 상태 계산
  const isValid = Object.keys(initialValues).every(key => {
      const error = validateField(key, values[key], values);
      return error === null && values[key] !== ''; // 에러 없고 비어있지 않음
  });

  // 특정 필드의 유효성 상태 계산
  const isFieldValid = useCallback((fieldName: keyof T): boolean => {
      const error = validateField(fieldName, values[fieldName], values);
      return error === null && values[fieldName] !== '';
  }, [validateField, values]);


  // 입력 값 변경 핸들러
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prevValues => {
        const newValues = { ...prevValues, [name]: value };
        // 변경 시 즉시 에러 업데이트
        const error = validateField(name as keyof T, value, newValues);
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: error,
        }));
        return newValues;
    });
     setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
  }, [validateField]);

  // 특정 필드 값 직접 설정 함수
  const setFieldValue = useCallback((name: keyof T, value: string) => {
    setValues(prevValues => {
        const newValues = { ...prevValues, [name]: value };
        const error = validateField(name, value, newValues);
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: error,
        }));
        return newValues;
    });
    setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
  }, [validateField]);


  // 폼 제출 핸들러
  const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void> | void) =>
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      // 제출 시 모든 필드 touched 처리 및 전체 유효성 재검사
      const newErrors: FormErrors = {};
      let formIsValid = true;
      const allTouched = Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Record<keyof T, boolean>);
      setTouched(allTouched);


      if (validationRules) {
        for (const key in validationRules) {
          if (Object.prototype.hasOwnProperty.call(validationRules, key)) {
            const rule = validationRules[key];
            if (rule) {
              const error = rule(values[key], values);
              newErrors[key] = error;
              if (error) {
                formIsValid = false;
              }
            }
          }
        }
      }
      // 필수 필드 비어있는지 확인
      Object.keys(initialValues).forEach(key => {
          if (!values[key]) {
              // 이미 에러가 없다면 '필수 입력 항목' 에러 추가 (선택적)
              if (!newErrors[key] && validationRules?.[key]) {
                 // newErrors[key] = `${key} is required`; // 필요시 활성화
              }
              formIsValid = false;
          }
      });


      setErrors(newErrors);

      if (formIsValid) {
        try {
          await onSubmit(values);
        } catch (submitError) {
          console.error("Form submission error:", submitError);
          // API 에러 등 처리
        }
      }

      setIsSubmitting(false);
    },
    [values, validationRules, initialValues]
  );

  // 폼 초기화 함수
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: false }), {} as Record<keyof T, boolean>));
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    isFieldValid,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
};

export default useForm;
