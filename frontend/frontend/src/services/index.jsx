import axios from "axios";

const api = axios.create({
  baseURL: "https://desafiobemol.herokuapp.com/",
});

export default api;
