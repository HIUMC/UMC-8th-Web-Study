import React from 'react';
import { Link } from 'react-router-dom';

const SigninPage = () => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
      <h1 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">로그인</h1>
      <p className="text-center text-gray-400 mt-4">
        로그인 구현 예정
      </p>
      <div className="mt-6 text-center">
        <Link to="/signup" className="text-purple-400 hover:text-purple-300">
          회원가입 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default SigninPage;
