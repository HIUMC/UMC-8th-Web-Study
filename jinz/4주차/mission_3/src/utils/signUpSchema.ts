import {z} from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email("이메일 형식을 갖추쇼"),
    password: z.string()
    .refine(
      (val) => val.length >= 8 && val.length <= 20,
      "비밀번호는 8자 이상 20자 이하로 입력하쇼쇼"
    ),
    passwordConfirm: z.string(),
    name: z.string().min(1, "닉네임을 입력하세요"),
  })
  .refine((data) => data.passwordConfirm === data.password, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않소",
})

export type FormData = z.infer<typeof signUpSchema>;