import api from "./baseUrl";

export const getUserOrders = async (id) => {
    return await api.get(`/order/${id}`).then(res => res)
}
export const addReview = async (data) => {
    return await api.post("/order/add", data).then(res => res)
}