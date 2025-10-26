import axios from "axios";

const api = axios.create({
  baseURL: "https://notepad-c972.onrender.com",
});

export default api;
