import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-xl text-center">
        <p>오류가 발생했습니다:</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage; 