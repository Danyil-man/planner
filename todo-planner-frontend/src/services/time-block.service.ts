import {
	ITimeBlockResponse,
	TypeTimeBlockFormState,
} from "@/types/time-block.types";

import { axiosWithAuthInstance } from "@/api/interceptors";

class TimeBlockService {
	private TIME_BLOCK_URL = "/user/time-blocks";

	async getTimeBlocks() {
		const response = await axiosWithAuthInstance.get<ITimeBlockResponse[]>(
			this.TIME_BLOCK_URL,
		);
		return response;
	}

	async createTimeBlock(data: TypeTimeBlockFormState) {
		const response = await axiosWithAuthInstance.post(
			this.TIME_BLOCK_URL,
			data,
		);
		return response;
	}

	async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
		const response = await axiosWithAuthInstance.put(
			`${this.TIME_BLOCK_URL}/${id}`,
			data,
		);
		return response;
	}

	async updateOrderTimeBlock(ids: string[]) {
		const response = await axiosWithAuthInstance.put(
			`${this.TIME_BLOCK_URL}/update-order`,
			{ ids },
		);
		return response;
	}

	async deleteTimeBlock(id: string) {
		const response = await axiosWithAuthInstance.delete(
			`${this.TIME_BLOCK_URL}/${id}`,
		);
		return response;
	}
}

export const timeBlockService = new TimeBlockService();
