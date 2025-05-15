import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignUp } from '../apis/auth';

const schema = z
  .object({
    email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .max(20, {
        message: '비밀번호는 20자 이하여야 합니다.',
      }),
    passwordCheck: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .max(20, {
        message: '비밀번호는 20자 이하여야 합니다.',
      }),
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormFields) => {
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    const reponse = await postSignUp(rest);
    console.log(reponse);
  };

  return (
    <div className="flex flex-col bg-gray-900 h-full items-center gap-20 pt-20">
      <h1 className="text-3xl text-white">회원가입 페이지</h1>
      <div className="flex flex-col gap-3 items-center">
        <input
          {...register('name')}
          placeholder="이름을 입력하세요."
          className="w-60 h-8 rounded-md bg-gray-400 text-gray-600 text-sm p-2"
        />
        {errors.name && (
          <div className="text-sm text-red-500">{errors.name.message}</div>
        )}
        <input
          {...register('email')}
          placeholder="이메일을 입력하세요."
          className="w-60 h-8 rounded-md bg-gray-400 text-gray-600 text-sm p-2"
        />
        {errors.email && (
          <div className="text-sm text-red-500">{errors.email.message}</div>
        )}
        <input
          {...register('password')}
          type="password"
          placeholder="비밀번호를 입력하세요."
          className="w-60 h-8 rounded-md bg-gray-400 text-gray-600 text-sm p-2"
        />
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}
        <input
          {...register('passwordCheck')}
          type="password"
          placeholder="비밀번호를 다시 한 번 입력하세요."
          className="w-60 h-8 rounded-md bg-gray-400 text-gray-600 text-sm p-2"
        />
        {errors.passwordCheck && (
          <div className="text-sm text-red-500">
            {errors.passwordCheck.message}
          </div>
        )}
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-gray-700 w-25 h-8 rounded-md text-white cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
