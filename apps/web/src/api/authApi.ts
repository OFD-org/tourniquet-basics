import { axiosInstance } from "./axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token?: string;
    token?: string;
}

export const authApi = {
    login: (payload: LoginPayload) =>
        axiosInstance.post<AuthResponse>("/auth/login", payload),

    signup: (payload: SignupPayload) =>
        axiosInstance.post<AuthResponse>("/auth/signup", payload),

    googleAuth: () => {
        window.location.href = "http://localhost:8090/auth/google";
    },
};
