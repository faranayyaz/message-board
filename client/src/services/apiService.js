import axios from "axios";

const BASE_URL = "http://localhost:8080";

const apiService = axios.create({
  baseURL: BASE_URL,
});

export default apiService;
