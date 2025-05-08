import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPageEmail = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();
  //올바른 이메일 비밀번호 설정
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      StorageHandler();
    }
  };

  const StorageHandler = () => {
    if (!isValid) {
      alert("이메일을 올바르게 입력하세요");
    } else {
      localStorage.setItem("email", emailRef.current.value);
      navigate("/signup/password");
    }
  };

  useEffect(() => {
    if (!emailError && emailRef.current?.value) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [emailRef.current?.value, emailError]);

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <input
        className="border-2 border-black-500 rounded-md p-2 w-1/2 mt-5 text-center"
        placeholder="이메일을 입력해주세요."
        type="email"
        ref={emailRef}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          if (pattern.test(e.target.value) === true) {
            setEmailError(false);
          } else {
            setEmailError(true);
          }
        }}
      />
      {emailError && (
        <div className="text-red-500">올바른 이메일을 입력하세요!</div>
      )}
      <Link
        to="/signup/password"
        className={`mt-2 rounded-md p-2 w-1/2 text-center text-center block text-sm
          ${isValid ? "border-black-500 text-black border-2 hover:bg-gray-200" : "border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed pointer-events-none"}
          
        `}
        onClick={StorageHandler}
      >
        다음
      </Link>
    </div>
  );
};

export default SignUpPageEmail;
