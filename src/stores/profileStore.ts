import { defineStore } from 'pinia';
import { decodeToken } from '@/utils/jwtDecoder.ts';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null as any | null,
    }),
    actions: {
        setProfile(profile: any) {
            // const decoded = decodeToken();
            if (profile) {
                this.profile = profile;
            } else {
                this.profile = null;
            }
        }
    },
});