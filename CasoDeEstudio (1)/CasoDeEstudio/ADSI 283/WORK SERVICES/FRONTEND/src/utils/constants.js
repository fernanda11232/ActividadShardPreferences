// const SERVE_IP = "work-services.onrender.com"
// const CLIENT_IP = "https://frontend-dx9.pages.dev"

const SERVE_IP = "localhost:3977"
const CLIENT_IP = "localhost:3000"

export const ENV = {
    BASE_PATH: `http://${CLIENT_IP}`,
    BASE_API: `http://${SERVE_IP}/api/V1`,
    API_ROUTES: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refreshAccessToken",
        RECOVER_PASSWORD: "auth/recoverPassword",
        USER_ME: "user/me",
        USER: "user",
        USERS: "users",
        WORK: "work",
        WORKS: "works",
        POSTULATE: "postulate",
        POSTULATES: "postulates",
        POSTULATES_ME: "postulates/me",
        CHAT: "chat",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
    }
}