import type { FC } from 'react';

const LoadingSpinner: FC = () => {
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#88bfba]"></div>
        </div>
    );
};

export default LoadingSpinner; 