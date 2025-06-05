import React, { FC } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { MeliCountry } from "@/types/form";

interface Properties {
	countries: MeliCountry[];
	name: string;
	label: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
	placeholder?: string;
	error?: FieldError;
}

const FormCountries: FC<Properties> = ({
	countries,
	name,
	control,
	placeholder,
	error,
	label,
}) => {
	return (
		<div className="space-y-1">
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<div>
						<label htmlFor={name}>{label}</label>
						<Select
							value={field.value}
							onValueChange={field.onChange}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent>
								{countries.map(({ code, name }) => (
									<SelectItem key={code} value={code}>
										{name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			/>
			{error && (
				<p className="text-sm text-red-600 mt-1">{error.message}</p>
			)}
		</div>
	);
};

export default FormCountries;
