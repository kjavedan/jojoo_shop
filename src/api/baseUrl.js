import axios from "axios";
import { storeToRefs } from "pinia";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// const store = useTokenStore()
// const {accessToken} = storeToRefs(store)

// api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

export default api;