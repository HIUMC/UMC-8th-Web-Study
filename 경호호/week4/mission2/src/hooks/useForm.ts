import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

type FormValues = Record<string, string>;

type FormErrors = Record<string, string | null>;

type ValidationRules<T extends FormValues> = {
  [K in keyof T]?: (value: string, values: T) => string | null;
};

interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

const useForm = <T extends FormValues>(
  initialValues: T,
  validationRules?: ValidationRules<T>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValid = Object.values(errors).every(error => error === null) &&
                  Object.keys(initialValues).every(key => values[key] !== '');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));

    if (validationRules?.[name]) {
      const error = validationRules[name]!(value, values);
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  }, [validationRules, values]);

  const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void> | void) =>
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});

      let formIsValid = true;
      const newErrors: FormErrors = {};

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
                  newErrors[key] = null;
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
        }
      }

      setIsSubmitting(false);
    },
    [values, validationRules]
  );

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
