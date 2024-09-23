import { IAuthForm, IAuthResponse } from "@/types/auth.types";

import { axiosClassicInstance } from "@/api/interceptors";

import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

export const authService = {
	async main(type: "login" | "register", data: IAuthForm) {
		const response = await axiosClassicInstance.post<IAuthResponse>(
			`/auth/${type}`,
			data,
		);

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken);
		}
		return response;
	},
	async getNewTokens() {
		const response = await axiosClassicInstance.post<IAuthResponse>(
			"/auth/login/access-token",
		);
		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken);
		}
		return response;
	},
	async logout() {
		const response = await axiosClassicInstance.post<boolean>("/auth/logout");

		if (response.data) {
			removeFromStorage();
		}

		return response;
	},
};
