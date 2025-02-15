import { defineStore } from 'pinia';
import { decodeToken } from '@/utils/jwtDecoder.ts';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null as any | null,
    }),
    actions: {
        setProfile() {
            const decoded = decodeToken();
            if (decoded) {
                this.profile = decoded;
            } else {
                this.profile = null;
            }
        }
    },
});