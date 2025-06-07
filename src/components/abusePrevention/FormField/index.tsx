"use client";
import React, { FC } from "react";
import { FieldError } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Properties {
	label: string;
	name: string;
	placeholder?: string;
	error?: FieldError;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
}

const FormField: FC<Properties> = ({
	label,
	name,
	placeholder,
	error,
	register,
}) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<Input
				id={name}
				placeholder={placeholder}
				aria-invalid={!!error}
				{...register}
				className={cn(
					"w-full",
					error && "border-red-500 ring-1 ring-red-500"
				)}
			/>
			{error && (
				<p className="text-sm text-red-600" role="alert">
					{error.message}
				</p>
			)}
		</div>
	);
};

export default FormField;
