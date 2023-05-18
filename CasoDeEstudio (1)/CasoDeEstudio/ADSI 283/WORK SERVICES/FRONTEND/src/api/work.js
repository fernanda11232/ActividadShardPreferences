import { ENV } from "../utils"

export class Work {
    baseApi = ENV.BASE_API;

    async getWorks(status = undefined) {
        const statusWork = `status=${status}`
        const url = `${this.baseApi}/${ENV.API_ROUTES.WORKS}?${statusWork}`

        const response = await fetch(url)
        const result = await response.json()

        if(response.status !== 200) throw result;
        return result
    }

    async createWork(accessToken, data, user){
        data.date = data.date.replace("T", " ")
        console.log(data.date);
        console.log(typeof(data.date));
        // console.log(dateTime);
        // console.log(typeof(dateTime));
        // console.log(dateTime);
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })

            if(data.fileAvatar) {
                formData.append("imageWork", data.fileAvatar)
            }
            formData.append("userWork", user.email)
            // formData.append("date", dateTime)

            const url = `${this.baseApi}/${ENV.API_ROUTES.WORK}`
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Token ${accessToken}`
                },
                body: formData,
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result

        } catch (error) {
            throw error
        }
    }

    async updateWork(accessToken, idWork, data){
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })

            if(data.fileAvatar) {
                formData.append("imageWork", data.fileAvatar)
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.WORK}/${idWork}`
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Token ${accessToken}`
                },
                body: formData,
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result

        } catch (error) {
            throw error
        }
    }

    async deleteWork(accessToken, idWork){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.WORK}/${idWork}`
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

    async getWorkPath(work) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.WORKS}/${work}`

            const response = await fetch(url)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result
        } catch (error) {
            throw error
        }
    }
}