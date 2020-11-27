import axios from "axios"

export const api = axios.create({
    baseURL: "http://10.18.0.72:3333"
})