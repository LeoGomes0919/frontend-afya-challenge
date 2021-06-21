import { createContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
}

interface SignInData {
  username: string;
  password: string;
}

interface AuthContextDate {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDate);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'clinic-token': token } = parseCookies();
    const { 'clinic-user': id } = parseCookies();
    if (token) {
      api.get(`/users/${id}`).then(response => {
        const { id, name } = response.data;
        setUser({
          id,
          name
        });
      })
    }
  }, []);

  async function signIn({ username, password }: SignInData) {
    const response = await api.post('/auth/', {
      username,
      password
    });

    const { token, id, name } = response.data;

    setCookie(undefined, 'clinic-token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
      path: '/'
    });

    setCookie(undefined, 'clinic-user', id, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/'
    });

    api.defaults.headers['Authorization'] = token;

    setUser({
      id,
      name
    });

    Router.push('/clients');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
