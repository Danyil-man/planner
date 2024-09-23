export interface IPomodoroRoundResponse {
	_id: string;
	createdAt?: string;
	updatedAt?: string;
	isCompleted?: boolean;
	totalSeconds: number;
}

export interface IPomodoroSessionResponse {
	_id: string;
	createdAt?: string;
	updatedAt?: string;
	isCompleted?: boolean;
	rounds?: IPomodoroRoundResponse[];
}

export type TypePomodoroSessionState = Partial<
	Omit<IPomodoroSessionResponse, "_id" | "createdAt" | "updatedAt">
>;

export type TypePomodoroRoundState = Partial<
	Omit<IPomodoroRoundResponse, "_id" | "createdAt" | "updatedAt">
>;
