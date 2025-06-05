"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { handleFormSubmission } from "@/app/actions/formActions";
import { FormInfo, FormSubmitInfo } from "@/types/form";

interface Properties {
	defaultValues: FormSubmitInfo;
}

const getRecaptchaToken = (jumpCaptcha: boolean): string => {
	if (jumpCaptcha) return "simulated-token";
	return window?.grecaptcha?.getResponse() || "";
};

const buildFormData = (data: FormInfo, jump: boolean): FormData => {
	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		formData.append(key, String(value));
	});
	formData.append("jump-recaptcha", String(jump));
	formData.append("g-recaptcha-response", getRecaptchaToken(jump));
	return formData;
};

const useMeliForm = ({ defaultValues }: Properties) => {
	const [jumpCaptcha, setJumpCaptcha] = useState<boolean>(false);
	const [generalError, setGeneralError] = useState<string | null>(null);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isLoading },
	} = useForm<FormInfo>({
		defaultValues,
	});

	const isDisabled = isLoading || isSubmitting;

	const onSubmit = async (data: FormInfo) => {
		setGeneralError(null);
		const formData = buildFormData(data, jumpCaptcha);

		try {
			await handleFormSubmission(formData);
		} catch (err) {
			if (err instanceof Error && err.message === "NEXT_REDIRECT") {
				return;
			}
			setGeneralError(
				err instanceof Error
					? err.message
					: "Ocurrió un error inesperado"
			);
		}
	};

	return {
		jumpCaptcha,
		generalError,
		control,
		isDisabled,
		errors,
		register,
		setJumpCaptcha,
		onSubmit: handleSubmit(onSubmit),
	};
};

export default useMeliForm;
