import api from "./baseUrl";

export const getProductReviews = async (id) => {
    return await api.get(`/review/product/${id}`).then(res => res)
}
export const getUserReviews = async (id) => {
    return await api.get(`/review/user/${id}`).then(res => res)
}
export const addReview = async (data) => {
    return await api.post("/review/add", data).then(res => res)
}
export const deleteReview = async (data) => {
    return await api.post("/review/delete", data).then(res => res)
}
