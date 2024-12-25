import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useHttpPrivateRequest = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: 0,
      Accept: "application/json",
    },
    timeout: 30000,
  });

  // Request interceptor to add Authorization header
  apiInstance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token expiration
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;
      const originalRequest = error.config;

      if (response.status === 401 && !originalRequest._retry) {
        // If token is expired or invalid, attempt to refresh the token
        originalRequest._retry = true;

        try {
          // Send request to refresh token
          const refreshResponse = await axios.post(
            "http://10.0.2.2:8080/myvettracer/auth/refresh",
            {},
            {
              headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Expires: 0,
                Accept: "application/json",
              },
            }
          );

          // If refresh token is successful, update the access token
          if (refreshResponse.data.code === 1000 && refreshResponse.data.result.token) {
            const newToken = refreshResponse.data.result.token;
            await AsyncStorage.setItem("token", newToken);

            // Retry the original request with the new token
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return apiInstance(originalRequest);
          }
        } catch (refreshError) {
          // Handle any errors from the refresh token request
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};
