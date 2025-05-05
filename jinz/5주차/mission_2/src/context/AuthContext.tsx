import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { postSignin } from "../apis/auth";

/*react 앱 전체에서 로그인/ 인증 상태를 공유해주는 곳...*/

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login:(signInData: RequestSigninDto) => Promise<void>;
    logout: () => void;
}

export const AuthContext= createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async() => {},
})

export const AuthProvider=({children}: PropsWithChildren) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));

    useEffect(()=>{
        const savedAccessToken = localStorage.getItem('accessToken');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        if (savedAccessToken) setAccessToken(savedAccessToken);
        if (savedRefreshToken) setRefreshToken(savedRefreshToken);
    }, [])

    const login = async (signInData: RequestSigninDto) => {
        try{
            const response = await postSignin(signInData);//로그인 요청
            const {accessToken, refreshToken} = response.data;//응답에서 토큰들 추출
            
            //토큰 상태 업데이트
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            
            //localStorage에 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        } catch (error) {
            console.error("로그인 실패:", error);
            throw error;
        }
    } 

    const logout = () => {
        //상태 초기화
        setAccessToken(null);
        setRefreshToken(null);

        //localStarage에서 토큰 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
} //커스텀 훅