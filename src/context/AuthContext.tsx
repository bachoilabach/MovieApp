import React, { createContext, useContext, useEffect, useState } from "react";
import { getAccountDetail } from "@/services/user.services";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type AuthContextType = {
  sessionId: string;
  user: {
    id: number;
    username: string;
    name: string;
  } | null;
  login: (sessionId: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const login = async (sessionId: string) => {
    setSessionId(sessionId);
    await AsyncStorage.setItem("sessionId", sessionId);
    const account = await getAccountDetail(sessionId);
    setUser({
      id: account.id,
      username: account.username,
      name: account.name,
    });
    await AsyncStorage.setItem("user", JSON.stringify(account));
  };

  const logout = async () => {
    setSessionId("");
    setUser(null);
    await AsyncStorage.clear();
  };

  useEffect(() => {
    const loadSession = async () => {
      const storedSessionId = await AsyncStorage.getItem("sessionId");
      if (storedSessionId) {
        setSessionId(storedSessionId);
        try {
          const userInfoString = await AsyncStorage.getItem("user");

          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            setUser(userInfo);
          }
        } catch (err) {
          console.warn("Failed to fetch user info");
        }
      }
    };
    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ sessionId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
