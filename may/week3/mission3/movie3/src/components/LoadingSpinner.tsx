import { ReactElement } from "react";

export const LoadingSpinner = () : ReactElement => { 
    return (
        <div className='size-12 animate-spin rounded-full border-6 
            border-t-transparent border-[#757ea9]' 
            role='status'
        >
            <span className='sr-only'>로딩 중...</span>
        </div>
    );
};