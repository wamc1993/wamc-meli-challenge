"use client";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { StepLabel } from "@/components/previousPage/StepLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { MeliFieldType, MeliSimpleField } from "@/types/form";
import { PreviousPageTranslations } from "@/types/translations";

interface Properties {
	t: PreviousPageTranslations;
	onSave: (data: string) => void;
}

interface FormValue {
	fields: MeliSimpleField[];
}

const avaibleTypes: string[] = ["text", "number", "boolean"];

const CustomFieldsCreator: FC<Properties> = ({ t, onSave }) => {
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	const { control, watch, register, setValue, handleSubmit } =
		useForm<FormValue>({
			defaultValues: {
				fields: [{ name: "age", type: "number", label: "Edad" }],
			},
		});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "fields",
	});

	const onSubmit = useCallback(
		(data: FormValue) => {
			const customFields = data.fields.filter(
				(f) => f.name.trim().length > 0 && f.type.trim().length > 0
			);
			const encoded =
				customFields.length === 0
					? ""
					: encodeURIComponent(JSON.stringify(customFields));
			onSave(encoded);
		},
		[onSave]
	);

	const data = watch();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		debounceTimer.current = setTimeout(() => {
			handleSubmit(onSubmit)();
		}, 400);
	}, [data]);

	return (
		<>
			<StepLabel number={2}>{t.step2}</StepLabel>
			<form>
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-4 mb-2">
						<Input
							{...register(`fields.${index}.name`)}
							placeholder={t.step3Name}
						/>
						<Select
							{...register(`fields.${index}.type`)}
							value={watch(`fields.${index}.type`)}
							onValueChange={(value) =>
								setValue(
									`fields.${index}.type`,
									value as MeliFieldType
								)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Tipo" />
							</SelectTrigger>
							<SelectContent>
								{avaibleTypes.map((value) => (
									<SelectItem key={value} value={value}>
										{value}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							{...register(`fields.${index}.label`)}
							placeholder={t.step3Label}
						/>
						<Button
							type="button"
							variant="outline"
							onClick={() => remove(index)}
						>
							🗑️
						</Button>
					</div>
				))}
				<div className="flex gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={() =>
							append({ name: "", type: "text", label: "" })
						}
					>
						{`➕ ${t.step3Add}`}
					</Button>
				</div>
			</form>
		</>
	);
};

export default CustomFieldsCreator;
