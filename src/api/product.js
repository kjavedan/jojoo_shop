import api from "./baseUrl";

export const getAllProducts = async () => {
    return await api.get("/product/", { withCredentials: true } ).then(res => res)
}
export const getProductById = async (id) => {
    return await api.get(`/product/${id}`).then(res => res)
}
