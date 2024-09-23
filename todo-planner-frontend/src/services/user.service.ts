import { IUser, TypeUserForm } from "@/types/auth.types";

import { axiosWithAuthInstance } from "@/api/interceptors";

export interface IProfileResponse {
	user: IUser;
	statistics: {
		label: string;
		value: string;
	}[];
}

class UserService {
	private BASE_URL = "/user/profile";

	async getProfile() {
		const response = await axiosWithAuthInstance.get<IProfileResponse>(
			this.BASE_URL,
		);
		return response.data;
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuthInstance.put(this.BASE_URL, data);
		return response.data;
	}
}

export const userService = new UserService();
