import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("이메일 형식을 갖추쇼쇼"),
  password: z.string()
  .refine(
    (val) => val.length >= 8 && val.length <= 20,
    "비밀번호는 8자 이상 20자 이하로 입력하쇼쇼"
  ),
});

export type LoginFormData = z.infer<typeof loginSchema>;