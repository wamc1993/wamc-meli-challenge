"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { handleFormSubmission } from "@/app/actions/formActions";
import { buildSchema } from "@/lib/buildSchema";
import { MeliField } from "@/types/form";

interface Properties {
	fields: MeliField[];
	token: string;
	referrer: string;
}

interface BuildFormDataProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
	jumpCaptcha: boolean;
	token: string;
	referrer: string;
}

const getRecaptchaToken = (jumpCaptcha: boolean): string => {
	if (jumpCaptcha) return "simulated-token";
	return window?.grecaptcha?.getResponse() || "";
};

const buildFormData = ({
	data,
	jumpCaptcha,
	token,
	referrer,
}: BuildFormDataProps): FormData => {
	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		formData.append(key, String(value));
	});
	formData.append("jump-recaptcha", String(jumpCaptcha));
	formData.append("token", token);
	formData.append("referrer", referrer);
	formData.append("g-recaptcha-response", getRecaptchaToken(jumpCaptcha));
	return formData;
};

const useMeliForm = ({ fields, token, referrer }: Properties) => {
	const [jumpCaptcha, setJumpCaptcha] = useState<boolean>(false);
	const [generalError, setGeneralError] = useState<string | null>(null);

	const { schema, defaultValues } = buildSchema(fields);

	const {
		control,
		handleSubmit,
		clearErrors,
		formState: { isSubmitting, isLoading },
	} = useForm<z.infer<typeof schema>>({
		defaultValues,
		resolver: zodResolver(schema),
	});

	const isDisabled = isLoading || isSubmitting;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = async (data: any) => {
		setGeneralError(null);
		const formData = buildFormData({ data, jumpCaptcha, token, referrer });

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
		schema,
		jumpCaptcha,
		generalError,
		control,
		isDisabled,
		clearErrors,
		setJumpCaptcha,
		onSubmit: handleSubmit(onSubmit),
	};
};

export default useMeliForm;
