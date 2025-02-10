import { defineStore } from 'pinia';
import { decodeToken } from '@/utils/jwtDecoder.ts';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as { id: string; email: string, companyName: string, apiKey: string, token: string } | null,
    }),
    actions: {
        setUser() {
            const decoded = decodeToken();
            if (decoded) {
                this.user = { id: decoded.id, email: decoded.email, companyName: decoded.companyName, apiKey: decoded.apiKey, token: decoded.token };
            } else {
                this.user = null;
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('bmToken');
        },
    },
});