import { ITaskResponse, TypeTaskFormState } from "@/types/task.types";

import { axiosWithAuthInstance } from "@/api/interceptors";

class TaskService {
	private TASK_URL = "/user/tasks";

	async getTasks() {
		const response = await axiosWithAuthInstance.get<ITaskResponse[]>(
			this.TASK_URL,
		);
		return response;
	}

	async createTask(data: TypeTaskFormState) {
		const response = await axiosWithAuthInstance.post(this.TASK_URL, data);
		return response;
	}

	async updateTask(id: string, data: TypeTaskFormState) {
		const response = await axiosWithAuthInstance.put(
			`${this.TASK_URL}/${id}`,
			data,
		);
		return response;
	}

	async deleteTask(id: string) {
		const response = await axiosWithAuthInstance.delete(
			`${this.TASK_URL}/${id}`,
		);
		return response;
	}
}

export const taskService = new TaskService();
