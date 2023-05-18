import { ENV } from "../utils"

export class Postulate {
    baseApi = ENV.BASE_API;

    async getPostulatesMe(accessToken, user){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POSTULATES_ME}?emailUser=${user.email}`

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

    async getPostulationPath(accessToken, work) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POSTULATE}/${work}`
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

    async createPostulates(accessToken, user, work){
        work.date = work.date.replace("T", " ")
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POSTULATE}`
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Token ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userPostulate: user.email,
                    id_Work: work._id,
                    date: work.date
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

    async deletePostulate(accessToken, idPostulate){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POSTULATE}/${idPostulate}`
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