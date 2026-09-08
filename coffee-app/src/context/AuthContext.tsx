import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  signed: boolean;
  user: string | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@DropStore:user');
      if (storagedUser) setUser(storagedUser);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (email: string) => {
    setUser(email);
    await AsyncStorage.setItem('@DropStore:user', email);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@DropStore:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
