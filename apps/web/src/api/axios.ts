import axios from "axios";
import { API_BASE_URL } from "../config/env";
import { store } from "../store/store";
import { startLoading, stopLoading } from "../store/slices/loading/loadingSlice";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(startLoading());

        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        store.dispatch(stopLoading());
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(stopLoading());
        return response;
    },
    (error) => {
        store.dispatch(stopLoading());
        if (error.response && error.response.status === 401) {
            const token = localStorage.getItem("token");
            if (token) {
                // Session expired — clear token and force re-login
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            // No token = user is on login/signup with wrong credentials.
            // Let the error fall through to the component's catch block.
        }
        return Promise.reject(error);
    }
);
