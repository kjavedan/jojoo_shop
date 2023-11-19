import api from "./baseUrl";

export const getUserById = async (id) => {
    return await api.get(`/user/${id}`).then(res => res)
}
export const registerUser = async (data) => {
    return await api.post("/user/add", data).then(res => res)
}
export const loginUser = async (data) => {
    return await api.post("/user/login", data).then(res => res)
}

export const getRefreshToken = async (data) => {
    return await api.post("/user/refresh-token", data).then(res => res)
}

export const retriveTokenWithGoogleCode = async (data) => {
    return await api.post('/user/google-login', data).then(res => res)
} 