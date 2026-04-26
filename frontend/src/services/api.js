import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  verifyEmail: (data) => api.post("/auth/verify-email", data),
  resendVerificationEmail: (data) => api.post("/auth/resend-verification-email", data),
};

// Pass API
export const passAPI = {
  createPass: (data) => api.post("/passes", data),
  getUserPasses: () => api.get("/passes"),
  getPassDetails: (id) => api.get(`/passes/${id}`),
  cancelPass: (id) => api.put(`/passes/${id}/cancel`),
};

export default api;
