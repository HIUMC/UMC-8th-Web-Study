import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
});

export const passwordSchema = z.object({
  password: z.string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .regex(/[a-zA-Z]/, { message: '비밀번호는 영문자를 포함해야 합니다.' })
    .regex(/[0-9]/, { message: '비밀번호는 숫자를 포함해야 합니다.' })
    .regex(/[^a-zA-Z0-9]/, { message: '비밀번호는 특수문자를 포함해야 합니다.' }),
  confirmPassword: z.string(),
});

export const nameSchema = z.object({
  name: z.string()
    .min(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
    .max(10, { message: '이름은 최대 10자까지 가능합니다.' }),
});

export const signupSchema = emailSchema
  .merge(passwordSchema)
  .merge(nameSchema)
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type NameFormData = z.infer<typeof nameSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
