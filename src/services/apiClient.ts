import axios from 'axios';
import {useAuthStore} from "@/stores/authStore.ts";

// const apiClient = axios.create({
//     baseURL: 'https://bmanager-api-246eb321dab2.herokuapp.com/api/v1',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
})

export class ApiClient {

    static async getProfile() {
        const token = localStorage.getItem('bmToken');
        const response = await apiClient.get('/profile', {headers:
                {
                    'Authorization': `Bearer ${token}`
                }})
        return response.data
    }

    static async login(body: any) {
        const response = await apiClient.post('/auth/login', body)
        return response.data
    }
}
