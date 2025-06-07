"use client";
import React from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MeliFieldOptions, MeliFieldType } from "@/types/form";

interface Properties<T extends FieldValues>
	extends Omit<ControllerProps<T>, "render"> {
	type: MeliFieldType;
	label?: string;
	placeholder?: string;
	className?: string;
	options?: MeliFieldOptions[];
	clearErrors?: (name: string) => void;
}

type Component = <T extends FieldValues>(
	props: Properties<T>
) => React.ReactElement;

const FormField: Component = ({
	type,
	label,
	placeholder,
	className,
	options,
	clearErrors,
	...props
}) => {
	return (
		<Controller
			{...props}
			render={({ field, fieldState }) => {
				const errorMessage = fieldState?.error?.message;

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const handleChange = (value: any) => {
					field.onChange(value);
					clearErrors?.(field.name);
				};

				return (
					<div className={cn("flex flex-col gap-1", className)}>
						{label && <label htmlFor={field.name}>{label}</label>}
						{type === "text" && (
							<Input
								type={type}
								{...field}
								id={field.name}
								onChange={(e) => handleChange(e.target.value)}
							/>
						)}
						{type === "number" && (
							<Input
								type={type}
								{...field}
								id={field.name}
								onFocus={(e) => {
									if (e.target.value === "0") {
										e.target.value = "";
									}
								}}
								onChange={(e) => {
									const newValue = Number(e.target.value);
									handleChange(
										isNaN(newValue) ? 0 : newValue
									);
								}}
							/>
						)}
						{type === "boolean" && (
							<Switch
								{...field}
								id={field.name}
								checked={field.value}
								onCheckedChange={handleChange}
							/>
						)}
						{type === "select" && (
							<Select
								value={field.value}
								onValueChange={handleChange}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent>
									{options?.map(({ label, value }) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									)) ?? []}
								</SelectContent>
							</Select>
						)}
						<div className="h-4 flex items-start">
							{errorMessage && (
								<p
									className="text-sm text-red-600"
									role="alert"
								>
									{errorMessage}
								</p>
							)}
						</div>
					</div>
				);
			}}
		/>
	);
};

export default FormField;
