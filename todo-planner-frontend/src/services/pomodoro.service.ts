import {
	IPomodoroSessionResponse,
	TypePomodoroRoundState,
	TypePomodoroSessionState,
} from "@/types/pomodoro.types";

import { axiosWithAuthInstance } from "@/api/interceptors";

class PomodoroService {
	private POMODORO_SESSION_URL = "/pomodoro-session";
	private POMODORO_ROUND_URL = "/pomodoro-round";

	async getTodaySession() {
		const response = await axiosWithAuthInstance.get<IPomodoroSessionResponse>(
			`${this.POMODORO_SESSION_URL}/today`,
		);
		return response;
	}

	async createSession() {
		const response = await axiosWithAuthInstance.post<IPomodoroSessionResponse>(
			this.POMODORO_SESSION_URL,
		);
		return response;
	}

	async updateSession(id: string, data: TypePomodoroSessionState) {
		const response = await axiosWithAuthInstance.put(
			`${this.POMODORO_SESSION_URL}/${id}`,
			data,
		);
		return response;
	}

	async deleteSession(id: string) {
		const response = await axiosWithAuthInstance.delete(
			`${this.POMODORO_SESSION_URL}/${id}`,
		);
		return response;
	}

	async updatePomodoroRound(id: string, data: TypePomodoroRoundState) {
		const response = await axiosWithAuthInstance.put(
			`${this.POMODORO_ROUND_URL}/${id}`,
			data,
		);
		return response;
	}
}

export const pomodoroService = new PomodoroService();
