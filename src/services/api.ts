import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://bmanager-api-246eb321dab2.herokuapp.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;