import axios from "axios"

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const axiosUrl = axios.create({
    baseURL: baseURL,
    withCredentials: true
})