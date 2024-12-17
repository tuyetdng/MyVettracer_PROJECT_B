import { create } from "zustand";
import { persist, createJSONStorage }  from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OwnerUser, Role } from "./types";

interface AuthState {
    user: OwnerUser | null;
    role: Role[] | null;
    tokenState: string | null;
    setUser: (user: OwnerUser) => void;
    setToken: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist<AuthState>(
        (set) => ({
            user: null,
            role: null,
            tokenState: null,

            setUser: (user) => set({ user }),

            setToken: (token) =>
                set({ tokenState: token }),

            clearAuth: () =>
                set({
                    user: null,
                    role: null,
                    tokenState: null,
                }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
