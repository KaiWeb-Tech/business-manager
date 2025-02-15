import axios from 'axios';

const apiAgz = axios.create({
    baseURL: 'https://validation.agendize.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export class ApiAgz {
    static async getAppointments(apiKey: string, token: string) {
        const response = await apiAgz.get(`/2.1/scheduling/companies/0/appointments?apiKey=${apiKey}&token=${token}`)
        return response.data.items
    }

    static async getContacts(apiKey: string, token: string) {
        const response = await apiAgz.get(`/2.0/clients?apiKey=${apiKey}&token=${token}`)
        return response.data.items
    }
}

export default apiAgz;