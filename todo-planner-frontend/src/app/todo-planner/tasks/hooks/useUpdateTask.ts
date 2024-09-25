import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { TypeTaskFormState } from "@/types/task.types";

import { taskService } from "@/services/task.service";

export function useUpdateTask(key?: string) {
	const queryClient = useQueryClient();
	const { mutate: updateTask } = useMutation({
		mutationKey: ["update task", key],
		mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) =>
			taskService.updateTask(id, data),
		onSuccess() {
			toast.success("Successfully updated task!");
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	return { updateTask };
}
