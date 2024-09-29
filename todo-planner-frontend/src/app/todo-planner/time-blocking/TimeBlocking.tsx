"use client";

import { FormProvider, useForm } from "react-hook-form";

import { TypeTimeBlockFormState } from "@/types/time-block.types";

import { TimeBlockingList } from "./TimeBlockList";
import { TimeBlockForm } from "./form/TimeBlockForm";

export function TimeBlocking() {
	const methods = useForm<TypeTimeBlockFormState>();

	return (
		<FormProvider {...methods}>
			<div className="grid grid-cols-2 gap-12">
				<TimeBlockingList />
				<TimeBlockForm />
			</div>
		</FormProvider>
	);
}
