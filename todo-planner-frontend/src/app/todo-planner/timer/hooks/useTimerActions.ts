import type { IPomodoroRoundResponse } from "@/types/pomodoro.types";

import { ITimerState } from "../timer.types";

import { useLoadSettings } from "./useLoadSettings";
import { useUpdateRound } from "./useUpdateRounds";

type TypeUseTimerActions = ITimerState & {
	rounds: IPomodoroRoundResponse[] | undefined;
};

export function useTimerActions({
	activeRound,
	setIsRunning,
	secondsLeft,
	rounds,
	setActiveRound,
}: TypeUseTimerActions) {
	const { workInterval } = useLoadSettings();
	const { isUpdateRoundPending, updateRound } = useUpdateRound();

	const pauseHandler = () => {
		setIsRunning(false);
		if (!activeRound?._id) return;

		updateRound({
			id: activeRound?._id,
			data: {
				totalSeconds: secondsLeft,
				isCompleted: Math.floor(secondsLeft / 60) >= workInterval,
			},
		});
	};

	const playHandler = () => {
		setIsRunning(true);
	};

	const nextRoundHandler = () => {
		if (!activeRound?._id) return;

		updateRound({
			id: activeRound?._id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60,
			},
		});
	};

	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted);
		if (!lastCompletedRound?._id) return;

		updateRound({
			id: lastCompletedRound?._id,
			data: {
				isCompleted: false,
				totalSeconds: 0,
			},
		});

		setActiveRound(lastCompletedRound);
	};

	return {
		isUpdateRoundPending,
		pauseHandler,
		playHandler,
		nextRoundHandler,
		prevRoundHandler,
	};
}
