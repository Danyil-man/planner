import axios, { type CreateAxiosDefaults } from "axios";

import { errorCatch } from "./error";
import {
	getAccessToken,
	removeFromStorage,
} from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";

const options: CreateAxiosDefaults = {
	baseURL: "http://localhost:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};

const axiosClassicInstance = axios.create(options);

const axiosWithAuthInstance = axios.create(options);

axiosWithAuthInstance.interceptors.request.use(config => {
	const accessToken = getAccessToken();

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosWithAuthInstance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === "jwt expired" ||
				errorCatch(error) === "jwt must be provided") &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await authService.getNewTokens();
				return axiosWithAuthInstance.request(originalRequest);
			} catch (error) {
				if (errorCatch(error) === "jwt expired") {
					removeFromStorage();
				}
			}
		}
		throw error;
	},
);

export { axiosClassicInstance, axiosWithAuthInstance };
