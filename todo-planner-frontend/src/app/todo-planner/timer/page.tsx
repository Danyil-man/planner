import { Metadata } from "next";

import { Heading } from "@/components/ui/heading";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

import { Pomodoro } from "./Pomodoro";

export const metadata: Metadata = {
	title: "Rounds",
	...NO_INDEX_PAGE,
};

export default function Page() {
	return (
		<div>
			<Heading title="Pomodoro timer" />
			<Pomodoro />
		</div>
	);
}
