import axios from "axios";
import { useRouter } from "vue-router";

// Create axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const excludedEndpoints = [
  "/auth/login",
  "/clients/create-password",
  "/forgot-password",
  "/reset-password",
];

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const currentTime = Math.floor(Date.now() / 1000); // current timestamp in seconds

    if (!excludedEndpoints.includes(config.url)) {
      if (token) {
        config.headers["X-Bayarind-Access"] = token;
      }
      config.headers["X-Bayarind-Time"] = currentTime;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const router = useRouter();
    if (error.response.status === 401) {
      // Handle unauthorized errors (e.g., token expired)
      localStorage.removeItem("token");
      router.replace("/auth/login");
    }
    return Promise.reject(error);
  },
);

export default instance;
