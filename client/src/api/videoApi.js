import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5173/api/videos"
})

const getAllVideos = () => API.get("/")
const getVideoById = (id) => API.get(`${id}`)

