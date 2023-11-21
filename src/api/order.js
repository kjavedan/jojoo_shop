import api from "./baseUrl";

export const getUserOrders = async (id) => {
    return await api.get(`/order/user/${id}`).then(res => res)
}
export const getOrderDetailsById = async (id) => {
    return await api.get(`/order/${id}`).then(res => res)
}
export const addOrder = async (data) => {
    return await api.post("/order/add", data).then(res => res)
}