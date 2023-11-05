import api from "./baseUrl";

export const getUserCart = async (id) => {
    return await api.get(`/cart/${id}`).then(res => res)
}
export const addToCart = async (data) => {
    return await api.post("/cart/add", data).then(res => res)
}
export const deleteFromCart = async (id) => {
    return await api.delete(`/cart/delete/${id}`,).then(res => res)
}

export const updateCart = async (data) => {
    return await api.put(`/cart/update/${id}`, data).then(res => res)
}
