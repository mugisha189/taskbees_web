import axios from "axios";
import { config } from "@/config";
import cookieStorage from "@/utils/cookieStorage";
// Determine API version based on environment
const apiVersion = process.env.NODE_ENV === "production" ? "api/v1" : "api/v1";
export const PUBLIC_API = axios.create({
  baseURL: `${config.BASE_URL}/${apiVersion}/`,
});

export const PROTECTED_API = axios.create({
  baseURL: `${config.BASE_URL}/${apiVersion}/`,
});

PROTECTED_API.interceptors.request.use(
  (config) => {
    const accessToken = cookieStorage.getItem("accessToken");
    
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

PROTECTED_API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = cookieStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await PUBLIC_API.post("auth/refresh-token", {
            refreshToken: refreshToken,
          });
         
          const newAccessToken = response.data.payload.tokens.accessToken;
          cookieStorage.setItem("accessToken", newAccessToken);
          cookieStorage.setItem("refreshToken", response.data.payload.tokens.refreshToken);
         
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return PROTECTED_API(originalRequest);
        } catch (tokenRefreshError) {
          cookieStorage.removeItem("accessToken");
        }
      }
    }
    return Promise.reject(error);
  }
);
