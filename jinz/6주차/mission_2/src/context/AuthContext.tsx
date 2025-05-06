import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { postSignin, getMyInfo } from "../apis/auth";

/*react 앱 전체에서 로그인/ 인증 상태를 공유해주는 곳...*/



interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
    login:(signInData: RequestSigninDto) => Promise<void>;
    logout: () => void;
}

export const AuthContext= createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    username: null,
    login: async () => {},
    logout: async() => {},
})

export const AuthProvider=({children}: PropsWithChildren) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

    useEffect(()=>{
        const savedAccessToken = localStorage.getItem('accessToken');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        const savedUsername = localStorage.getItem('username');
        if (savedAccessToken) setAccessToken(savedAccessToken);
        if (savedRefreshToken) setRefreshToken(savedRefreshToken);
        if (savedUsername) setUsername(savedUsername);
    }, [])

    const login = async (signInData: RequestSigninDto) => {
        try{
            const response = await postSignin(signInData);
            const { accessToken, refreshToken } = response.data;
            
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // 로그인 후 사용자 정보 가져오기
            const userInfo = await getMyInfo();
            setUsername(userInfo.data.name);
            localStorage.setItem('username', userInfo.data.name);
        } catch (error) {
            console.error("로그인 실패:", error);
            throw error;
        }
    } 

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUsername(null);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
    }

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
} //커스텀 훅