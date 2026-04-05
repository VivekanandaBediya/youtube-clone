import axios from "axios";

// Create authentication connection between frontend and server 
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);