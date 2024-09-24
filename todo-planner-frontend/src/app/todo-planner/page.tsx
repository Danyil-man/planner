import { Metadata } from "next";

import { Heading } from "@/components/ui/heading";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

import { Statistics } from "./Statistics";

export const metadata: Metadata = {
	title: "Dashboard",
	...NO_INDEX_PAGE,
};

export default function Page() {
	return (
		<div>
			<Heading title="Statistics" />
			<Statistics />
		</div>
	);
}
