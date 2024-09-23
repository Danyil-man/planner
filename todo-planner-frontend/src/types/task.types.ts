export enum EnumTaskPriorities {
	low = "low",
	medium = "medium",
	high = "high",
}

export interface ITaskResponse {
	_id: string;
	name: string;
	priority?: EnumTaskPriorities;
	isCompleted: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export type TypeTaskFormState = Partial<
	Omit<ITaskResponse, "_id" | "updatedAt">
>;
