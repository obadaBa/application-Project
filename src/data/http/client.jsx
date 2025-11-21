// src/data/http/client.js
import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "[HTTP REQUEST]",
        (config.method || "GET").toUpperCase(),
        config.url,
        { params: config.params, data: config.data }
      );
    }

    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[HTTP REQUEST ERROR]", error);
    }
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[HTTP RESPONSE]",
        response.config.url,
        response.status,
        response.data
      );
    }
    return response;
  },
  (error) => {
    const normalizedError = {
      message:
        error?.response?.data?.message || error?.message || "حدث خطأ غير متوقع",
      status: error?.response?.status,
      data: error?.response?.data,
      raw: error,
    };

    if (process.env.NODE_ENV === "development") {
      console.error("[HTTP RESPONSE ERROR]", normalizedError);
    }

    return Promise.reject(normalizedError);
  }
);
