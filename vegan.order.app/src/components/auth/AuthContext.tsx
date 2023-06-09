import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { parseJwt } from './auth.service';

const BASE_URL = 'http://localhost:8080/auth/';

interface UserData {
  data: any;
  accessToken: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (username: string, password: string) => Promise<AxiosResponse<any>>;
  register: (username: string, password: string, email: string) => Promise<AxiosResponse<any>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async (username: string, password: string) => {
    throw new Error('AuthContext not yet initialized');
  },
  register: async (username: string, password: string, email:string) => {
    throw new Error('AuthContext not yet initialized')
  },
  loading: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  const clearLogoutTimeout = useCallback(() => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
  }, [logoutTimer]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    clearLogoutTimeout();
  }, [clearLogoutTimeout]);

  const setLogoutTimeout = useCallback((accessToken: string | null) => {
    clearLogoutTimeout();

    if (accessToken) {
      const { exp } = parseJwt(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeout = (exp - currentTime) * 1000; // Timeout in milliseconds

      const timer = setTimeout(() => {
        logout();
      }, timeout);

      setLogoutTimer(timer);
    }
  }, [clearLogoutTimeout, logout]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser) as UserData;
      setUser(parsedUser);
      setLoading(false);
      setLogoutTimeout(parsedUser.accessToken);
    }
  },[]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await axios.post(BASE_URL + 'login', { username, password });
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const loggedInUser: UserData = { data, accessToken };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setLoading(false);
      setLogoutTimeout(accessToken);
      return response;
    } catch (err) {
      throw err;
    }
  }, [setLogoutTimeout]);

  const register = useCallback(async (username: string, password: string, email: string) => {
    try {
      const response = await axios.post(BASE_URL + 'register', {username, password, email});
      const { accessToken } = response.data;
      const data = parseJwt(accessToken);
      const loggedInUser: UserData = { data, accessToken };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setLoading(false);
      setLogoutTimeout(accessToken);
      return response;
    } catch (err) {
      throw err;
    }
  }, [setLogoutTimeout]);
  return (
    <AuthContext.Provider value={{ user, login, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
