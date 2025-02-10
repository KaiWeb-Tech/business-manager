import axios from 'axios';

const apiAgz = axios.create({
    baseURL: 'https://france.agendize.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiAgz;