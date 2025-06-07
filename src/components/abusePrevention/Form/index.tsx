"use client";
import React, { FC } from "react";
import z from "zod";

import BackButton from "@/components/abusePrevention/BackButton";
import CaptchaLoader from "@/components/abusePrevention/CaptchaLoader";
import FormFieldTemplate from "@/components/abusePrevention/FormFieldTemplate";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MeliField } from "@/types/form";
import { AbusePreventionTranslations } from "@/types/translations";
import useMeliForm from "./useMeliForm";

interface Properties {
	t: AbusePreventionTranslations;
	fields: MeliField[];
	token: string;
	referrer: string;
}

const Form: FC<Properties> = ({ t, fields, token, referrer }) => {
	const tt = t.default;

	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		schema,
		jumpCaptcha,
		control,
		generalError,
		isDisabled,
		onSubmit,
		setJumpCaptcha,
		clearErrors,
	} = useMeliForm({
		fields,
		token,
		referrer,
	});

	const FormField = FormFieldTemplate<z.infer<typeof schema>>;

	return (
		<form className="flex flex-col gap-2" onSubmit={onSubmit}>
			<div className="rounded-md p-2 flex justify-end gap-2 items-center">
				<label htmlFor="jump">Ignorar validación del CaptCha?</label>
				<Switch
					id="jump"
					checked={jumpCaptcha}
					onCheckedChange={setJumpCaptcha}
				/>
			</div>

			{fields.map((field) => (
				<FormField
					key={field.name}
					control={control}
					name={field.name}
					type={field.type}
					label={field.label}
					options={field.options}
					clearErrors={clearErrors}
				/>
			))}

			<CaptchaLoader />
			<div className="min-h-[30px]">
				{generalError !== null && (
					<p className="subtitle-error">*{generalError}</p>
				)}
			</div>
			<div className="grid grid-cols-2 gap-2 w-full sm:w-max sm:mx-auto">
				<BackButton
					referrer={referrer}
					label={tt.backButton}
					className="w-full"
				/>
				<Button
					type="submit"
					className="w-full min-w-[96px]"
					disabled={isDisabled}
					aria-busy={isDisabled}
				>
					{isDisabled ? (
						<div
							className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
							role="status"
							aria-label="Loading"
						/>
					) : (
						tt.confirmButton
					)}
				</Button>
			</div>
		</form>
	);
};

export default Form;
