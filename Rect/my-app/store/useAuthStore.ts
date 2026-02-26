import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface AuthState {
    token: string | null;
    user: any | null;
    setAuth: (token: string, user: any) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({ token, user }),
            clearAuth: () => {
                // 1. 清除浏览器 Cookie
                Cookies.remove('auth-token', { path: '/' });

                // 2. 重置 Zustand 状态
                set({ token: null, user: null });
            },
        }),
        {
            name: 'auth-storage', // 存储在 localStorage 中的 key
        }
    )
);