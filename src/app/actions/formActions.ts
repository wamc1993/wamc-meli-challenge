"use server";
import { validateToken } from "@/lib/validateParams";
import { redirect } from "next/navigation";

export async function handleFormSubmission(formData: FormData) {
	const fields = [
		"fullName",
		"email",
		"country",
		"address",
		"token",
		"referrer",
	];
	const data: Record<string, string> = {};

	for (const field of fields) {
		const value = formData.get(field);
		if (!value || typeof value !== "string") {
			throw new Error(`Campo requerido faltante o inválido: ${field}`);
		}
		data[field] = value;
	}

	const captchaToken = formData.get("g-recaptcha-response");
	const jumpCaptcha = formData.get("jump-recaptcha") === "true";

	if (!data.token || !validateToken(data.token)) {
		throw new Error("Token inválido");
	}

	if (!jumpCaptcha) {
		if (!captchaToken || typeof captchaToken !== "string") {
			throw new Error("Captcha faltante");
		}
		const secret = process.env.RECAPTCHA_SECRET_KEY;
		if (!secret) {
			throw new Error("Falta la clave secreta de reCAPTCHA");
		}

		const params = new URLSearchParams({
			secret,
			response: captchaToken,
		});

		const response = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: params.toString(),
			}
		);

		const result = await response.json();

		if (!result.success) {
			console.error("Error captcha:", result);
			throw new Error("No pudimos validar tu captcha.");
		}
	}

	redirect("/last-step");
}
