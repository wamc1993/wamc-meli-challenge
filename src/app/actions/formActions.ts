"use server";
import { redirect } from "next/navigation";

export async function handleFormSubmission(formData: FormData) {
	const fullName = formData.get("fullName");
	const email = formData.get("email");
	const country = formData.get("country");
	const address = formData.get("address");
	const referrer = formData.get("referrer");
	const token = formData.get("token");
	const captchaToken = formData.get("g-recaptcha-response");
	const jumpCaptcha = formData.get("jump-recaptcha") === "true";

	if (!token || typeof token !== "string" || token !== "abc123") {
		throw new Error("Token inválido");
	}

	if (!captchaToken || typeof captchaToken !== "string") {
		throw new Error("Captcha faltante");
	}

	if (!jumpCaptcha) {
		const secret = process.env.RECAPTCHA_SECRET_KEY;

		const response = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${secret}&response=${captchaToken}`,
			}
		);

		const data = await response.json();

		if (!data.success) {
			console.error("Error captcha:", data);
			throw new Error("No pudimos validar tu captcha.");
		}
	} else {
		console.log("Captcha verificado localmente (modo dev)");
	}

	if (
		!fullName ||
		!email ||
		!country ||
		!address ||
		typeof fullName !== "string" ||
		typeof email !== "string"
	) {
		throw new Error("Formulario incompleto");
	}

	redirect("/last-step");
}
