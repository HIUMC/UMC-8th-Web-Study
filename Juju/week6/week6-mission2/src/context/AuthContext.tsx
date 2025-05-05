import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
    accessToken: string | null; // 있을 수도 없을 수도 있다.
    refreshToken: string | null; // 얘도 역시 있을 수도 없을 수도 있다.
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAcessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    const login = async (signinData: RequestSigninDto) => {
        try {
            const {data} = await postSignin(signinData);

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");
                window.location.href = "/my"; // 로그인 성공 시 마이페이지로 이동
            }
        } catch (error) {
            console.log("로그인 오류", error);
            alert("로그인에 실패했습니다.");
        }
    };

    const logout = async () => {
        try {
            await postLogout();
            removeAcessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            alert("로그아웃 성공");
        } catch (error){
            console.error("로그아웃 오류", error);
            alert("로그아웃에 실패했습니다.");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
};