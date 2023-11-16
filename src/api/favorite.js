import api from "./baseUrl";


export const getAllFavoriteData = async () => {
    return await api.get("/favorite/" ).then(res => res)
}

export const getFavoriteById = async (id) => {
    return await api.get(`/favorite/${id}`).then(res => res)
}
export const addFavorite = async (data) => {
    return await api.post("/favorite/add", data).then(res => res)
}
export const deleteFavorite = async (data) => {
    return await api.post("/favorite/delete", data).then(res => res)
}
