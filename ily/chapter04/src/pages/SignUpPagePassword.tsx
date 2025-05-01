import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPagePassword = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [checkError, setCheckError] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(false);
  const [length, setLength] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      SignupHandler();
    }
  };

  useEffect(() => {
    if (passwordRef.current?.value === passwordCheckRef.current?.value) {
      setIsValid(true);
      setCheckError(false);
    } else {
      setIsValid(false);
      setCheckError(true);
    }
  }, [passwordRef.current?.value, passwordCheckRef.current?.value]);

  useEffect(() => {
    if (
      nameRef.current?.value !== null &&
      passwordCheckRef.current?.value !== null &&
      passwordRef.current?.value.length >= 8 &&
      passwordCheckRef.current.value.length >= 8
    ) {
      setLength(true);
    } else {
      setLength(false);
    }
  }, [
    passwordRef.current?.value.length,
    passwordCheckRef.current?.value.length,
  ]);

  const SignupHandler = async () => {
    console.log("button signupHandler");
    if (passwordRef.current?.value === passwordCheckRef.current?.value) {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/v1/auth/signup",
          {
            name: nameRef.current?.value,
            email: localStorage.getItem("email"),
            password: passwordRef.current?.value,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("비밀번호를 같게 입력하세요");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        className="border-2 border-black-500 rounded-md p-2 w-1/2 mt-2 text-center"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        ref={passwordRef}
        onChange={(e) => {
          if (e.target.value.length >= 8) {
            setPasswordError(false);
          } else {
            setPasswordError(true);
          }
        }}
      />
      {passwordError && (
        <div className="text-red-500">비밀번호를 8글자 이상 입력하세요!</div>
      )}
      <input
        className="border-2 border-black-500 rounded-md p-2 w-1/2 mt-2 text-center"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        ref={passwordCheckRef}
        onChange={() => {
          if (passwordRef.current?.value === passwordCheckRef.current?.value) {
            setCheckError(false);
          } else {
            setCheckError(true);
          }
        }}
      />
      {passwordError && (
        <div className="text-red-500">비밀번호를 같도록 입력해주세요</div>
      )}
      <input
        className="border-2 border-black-500 rounded-md p-2 w-1/2 mt-2 text-center"
        placeholder="닉네임을 입력하세요."
        type="name"
        ref={nameRef}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={SignupHandler}
        disabled={!length}
        className={`mt-2 rounded-md p-2 w-1/2 text-center
            ${!checkError ? "border-black-500 text-black border-2 hover:bg-gray-200" : "border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed"}
          `}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignUpPagePassword;
