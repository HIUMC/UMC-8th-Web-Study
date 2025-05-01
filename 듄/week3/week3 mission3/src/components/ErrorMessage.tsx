import type { FC } from 'react';

interface ErrorMessageProps {
    message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message = '데이터를 불러오는 중 오류가 발생했습니다.' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
            <div className="text-[#88bfba] mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">오류가 발생했습니다</h2>
            <p className="text-gray-600 text-center max-w-md">{message}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="mt-6 px-6 py-2 bg-[#88bfba] text-white rounded-lg hover:bg-[#7ab3ae] transition-colors duration-200"
            >
                다시 시도
            </button>
        </div>
    );
};

export default ErrorMessage; 