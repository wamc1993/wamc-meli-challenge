"use client";
import React, { FC } from "react";

import BackButton from "@/components/BackButton";
import CaptchaLoader from "@/components/CaptchaLoader";
import FormCountries from "@/components/FormCountries";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormSubmitInfo, MeliCountry } from "@/types/form";
import { AbusePreventionTranslations } from "@/types/translations";
import useMeliForm from "./useMeliForm";

interface Properties {
	defaultValues: FormSubmitInfo;
	t: AbusePreventionTranslations;
	countries: MeliCountry[];
}

const Form: FC<Properties> = ({ defaultValues, t, countries }) => {
	const tt = t.default;

	const {
		jumpCaptcha,
		errors,
		control,
		generalError,
		isDisabled,
		register,
		onSubmit,
		setJumpCaptcha,
	} = useMeliForm({
		defaultValues,
	});

	return (
		<form className="flex flex-col gap-4" onSubmit={onSubmit}>
			<div className="rounded-md p-2 flex justify-end gap-2 items-center">
				<label htmlFor="jump">Ignorar validación del CaptCha?</label>
				<Switch
					id="jump"
					checked={jumpCaptcha}
					onCheckedChange={setJumpCaptcha}
				/>
			</div>
			<FormField
				label={tt.fields.fullName.label}
				name="fullName"
				placeholder={tt.fields.fullName.placeholder}
				error={errors.fullName}
				register={register("fullName", {
					required: tt.required,
				})}
			/>
			<FormField
				label={tt.fields.email.label}
				name="email"
				placeholder={tt.fields.email.placeholder}
				error={errors.email}
				register={register("email", {
					required: tt.required,
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: tt.invalidEmail,
					},
				})}
			/>
			<FormCountries
				name="country"
				control={control}
				countries={countries}
				placeholder={tt.fields.country.placeholder}
				error={errors.country}
				label={tt.fields.country.label}
			/>
			<FormField
				label={tt.fields.address.label}
				name="address"
				placeholder={tt.fields.address.placeholder}
				error={errors.address}
				register={register("address", {
					required: tt.required,
				})}
			/>
			<input type="hidden" name="token" value={defaultValues.token} />
			<input
				type="hidden"
				name="referrer"
				value={defaultValues.referrer}
			/>

			<CaptchaLoader />
			<div className="h-[30px]">
				{generalError !== null && (
					<p className="subtitle-error">*{generalError}</p>
				)}
			</div>
			<div className="grid grid-cols-2 gap-2 w-full sm:w-max sm:mx-auto">
				<BackButton
					referrer={defaultValues.referrer}
					label={tt.backButton}
					className="w-full"
				/>
				<Button
					type="submit"
					className="w-full min-w-[96px]"
					disabled={isDisabled}
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
