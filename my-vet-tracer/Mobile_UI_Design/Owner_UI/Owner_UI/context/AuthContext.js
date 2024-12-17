import { createContext } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    userToken: null,
    signIn: async (token) => {},
    signOut: async () => {},
    isLoading: true
});
