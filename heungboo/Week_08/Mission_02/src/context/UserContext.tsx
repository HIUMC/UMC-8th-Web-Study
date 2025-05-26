import React, { createContext, useContext, useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

interface UserContextType {
  user: ResponseMyInfoDto | null;
  setUser: React.Dispatch<React.SetStateAction<ResponseMyInfoDto | null>>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ResponseMyInfoDto | null>(null);

  const refreshUser = async () => {
    const response = await getMyInfo();
    setUser(response);
  };

  useEffect(() => {
    refreshUser(); // 초기 사용자 정보 로드
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
