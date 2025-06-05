"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { handleFormSubmission } from "@/app/actions/formActions";
import { FormInfo, FormSubmitInfo } from "@/types/form";

interface Properties {
	defaultValues: FormSubmitInfo;
}

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
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, String(value));
		});

		formData.append("jump-recaptcha", String(jumpCaptcha));

		if (jumpCaptcha) {
			formData.append("g-recaptcha-response", "simulated-token");
		}

		try {
			await handleFormSubmission(formData);
			setGeneralError(null);
		} catch (err) {
			if (err instanceof Error) {
				setGeneralError(err.message);
			} else {
				setGeneralError("Ocurrió un error inesperado");
			}
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
