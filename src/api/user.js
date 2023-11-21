import api from "./baseUrl";

export const getUserById = async (id) => {
    return await api.get(`/user/${id}`).then(res => res)
}
export const updateUserById = async (id, data) => {
    return await api.put(`/user/update/${id}`, data).then(res => res)
}
export const registerUser = async (data) => {
    return await api.post("/user/add", data, { withCredentials: true }).then(res => res)
}
export const loginUser = async (data) => {
    return await api.post("/user/login", data, { withCredentials: true }).then(res => res)
}

export const retriveTokenWithGoogleCode = async (data) => {
    return await api.post('/user/google-login' , data, { withCredentials: true }).then(res => res)
} 

export const getUserInfoByRefreshToken = async () => {
    return await api.post('/user/refresh-token',{}, { withCredentials: true })
}