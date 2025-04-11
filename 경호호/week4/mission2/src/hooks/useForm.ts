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
  isValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
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

  // 폼 전체 유효성 상태 계산
  const isValid = Object.values(errors).every(error => error === null) && 
                  Object.keys(initialValues).every(key => values[key] !== ''); // 모든 필드가 비어있지 않은지 확인 (선택적)

  // 입력 값 변경 핸들러
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));

    // 입력 변경 시 해당 필드 유효성 검사 수행
    if (validationRules?.[name]) {
      const error = validationRules[name]!(value, values);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  }, [validationRules, values]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void> | void) => 
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({}); // 제출 시 에러 초기화

      let formIsValid = true;
      const newErrors: FormErrors = {};

      // 전체 필드 유효성 검사
      if (validationRules) {
        for (const key in validationRules) {
          if (Object.prototype.hasOwnProperty.call(validationRules, key)) {
            const rule = validationRules[key];
            if (rule) {
              const error = rule(values[key], values);
              if (error) {
                newErrors[key] = error;
                formIsValid = false;
              } else {
                newErrors[key] = null; // 유효한 경우 에러 없음 표시
              }
            }
          }
        }
      }
      
      setErrors(newErrors);

      if (formIsValid) {
        try {
          await onSubmit(values);
        } catch (submitError) {
          console.error("Form submission error:", submitError);
          // 제출 관련 에러 처리 (예: API 에러)는 onSubmit 콜백 내에서 처리하거나 여기서 추가 가능
        }
      }
      
      setIsSubmitting(false);
    },
    [values, validationRules]
  );

  // 폼 초기화 함수
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
