import api from "./baseUrl";

export const getProductReview = async (id) => {
    return await api.get(`/review/${id}`).then(res => res)
}
export const addReview = async (data) => {
    return await api.post("/review/add", data).then(res => res)
}
export const deleteReview = async (data) => {
    return await api.post("/review/delete", data).then(res => res)
}
