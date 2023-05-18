import { ENV } from "../utils"

export class Chat {
    baseApi = ENV.BASE_API;

    async getMessages(accessToken, idWork) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT}/${idWork}`
            const params = {
                headers: {
                    Authorization: `Token ${accessToken}`
                },
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result
        } catch (error) {
            throw error
        }
    }

    async saveMessage(accessToken, user, work, message, newHour){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT}`
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Token ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_Work: work,
                    message: message,
                    nameUser: user.firstname,
                    date: newHour
                }),
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result

        } catch (error) {
            throw error
        }
    }

    async deleteMessages(accessToken, idMessage) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT}/${idMessage}`
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${accessToken}`
                },
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result
        } catch (error) {
            throw error
        }
    }
}