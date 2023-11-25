import api from './baseUrl'

export const getProductReviews = async (id) => {
  return await api.get(`/review/product/${id}`).then((res) => res)
}
export const getUserReviews = async (id) => {
  return await api.get(`/review/user/${id}`).then((res) => res)
}
export const addReview = async (data) => {
  return await api.post('/review/add', data).then((res) => res)
}
export const updateReview = async (id, data) => {
  return await api.put(`/review/update/${id}`, data).then((res) => res)
}
export const deleteReview = async (id) => {
  return await api.delete(`/review/delete/${id}`).then((res) => res)
}
