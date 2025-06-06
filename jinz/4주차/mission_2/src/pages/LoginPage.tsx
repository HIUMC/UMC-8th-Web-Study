import useForm from "../hooks/useForm";
import { userSignInformation, validateSignin } from "../utils/validate";


const Login = () => {
    const {values, errors, touched, getInputProps} = useForm<userSignInformation>({
        initialValues:{
            email: '',
            password: ''   
        },
        validate: validateSignin
    })

    const handleSubmit = () => {
        console.log(values);
    };  //여기다가 async걸고 axoios로 url에 values보내면 ㅇㅇ 그렇게 된다다

    const isDisabled = 
        Object.values(errors || {}).some((errors)=>errors.length >0) || //오류가 있으면true
        Object.values(values).some((value)=>value ==="") ; //비어있으면 true
    
    return(
        <div className='flex flex-col items-center justify-center h-full gap-4'>
            <div className="flex flex-col gap-3">
                <input  
                    {...getInputProps("email")}
                    className={`border border=[#ccc] w-[300px] p-[10px] focus:border=[#807bff] rounded-sm 
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"email"}
                    placeholder="이메일의 자리입니다..."/>
                    {errors.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input  
                    {...getInputProps("password")}
                    className={`border border=[#ccc] w-[300px] p-[10px] focus:border=[#807bff] rounded-sm 
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"password"}
                    placeholder="비밀번호의 자리입니다..."/>
                    {errors.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                    )}
            </div>
            <button type='button' 
                onClick={handleSubmit}
                disabled={isDisabled} 
                className="w-[300px] bg-blue-600 text-white py-3 rounded-md text-lg font-midium hover:bg-blue-700 transition-colors cusor-pointer disabled:bg-gray-300"
                >로그인</button>
        </div>
        
        
    )
}

export default Login;

