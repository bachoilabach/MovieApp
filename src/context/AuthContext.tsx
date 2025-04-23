import React, { createContext, useContext, useState } from 'react';
import { getAccountDetail } from '@/services/user.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [sessionId, setSessionId] = useState<string>('');
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const login = async (sessionId: string) => {
    setSessionId(sessionId);
    await AsyncStorage.setItem('sessionId', sessionId);
    const account = await getAccountDetail(sessionId);
    setUser({
      id: account.id,
      username: account.username,
      name: account.name,
    });
  };

  const logout = () => {
    setSessionId('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ sessionId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
