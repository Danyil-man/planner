import { Metadata } from "next";

import { Heading } from "@/components/ui/heading";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

import Settings from "./Settings";

export const metadata: Metadata = {
	title: "Settings",
	...NO_INDEX_PAGE,
};

export default function Page() {
	return (
		<div>
			<Heading title="Settings" />
			<Settings />
		</div>
	);
}
