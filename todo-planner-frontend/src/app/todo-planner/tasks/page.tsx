import { Metadata } from "next";

import { Heading } from "@/components/ui/heading";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

import { TasksView } from "./TasksView";

export const metadata: Metadata = {
	title: "Tasks",
	...NO_INDEX_PAGE,
};

export default function Tasks() {
	return (
		<div>
			<Heading title="Tasks" />
			<TasksView />
		</div>
	);
}
