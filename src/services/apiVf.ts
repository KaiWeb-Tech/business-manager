import axios from 'axios';

const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

export class ApiVf {

    static async getEstimates(account: string, token: string) {
        const response = await apiClient.get(`https://${account}/invoices.json?api_token=${token}`)
        return response.data.filter((item: any) => item.kind === "estimate")
    }

    static async getInvoices(account: string, token: string) {
        const response = await apiClient.get(`https://${account}/invoices.json?api_token=${token}`)
        return response.data.filter((item: any) => item.kind === "vat")
    }

}
