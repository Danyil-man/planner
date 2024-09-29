import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { taskService } from "@/services/task.service";

export function useDeleteTask() {
	const queryClient = useQueryClient();

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ["delete task"],
		mutationFn: (id: string) => taskService.deleteTask(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["tasks"],
			});
			toast.success("Task successfully deleted!");
		},
	});

	return { deleteTask, isDeletePending };
}
