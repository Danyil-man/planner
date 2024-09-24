"use client";

import Loader from "@/components/ui/loader";

import { useProfile } from "@/hooks/useProfile";

export function Statistics() {
	const { data, isLoading } = useProfile();

	return isLoading ? (
		<Loader />
	) : (
		<div className="grid grid-cols-4 gap-12 mt-7">
			{data?.statistics.length ? (
				data.statistics.map(statistic => (
					<div
						key={statistic.label}
						className="bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500"
					>
						<div className="text-xl">{statistic.label}</div>
						<div className="text-3xl font-semibold">{statistic.value}</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	);
}
