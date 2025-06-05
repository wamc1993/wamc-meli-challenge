import { JSX } from "react";

export interface AbusePreventionTranslations {
	invalidToken: {
		title: string;
		message: string;
	};
	noAccess: {
		title: string;
		message: string;
	};
	default: {
		title: string;
		subtitle: string;
		fields: {
			fullName: {
				label: string;
				placeholder: string;
			};
			email: {
				label: string;
				placeholder: string;
			};
			country: {
				label: string;
				placeholder: string;
			};
			address: {
				label: string;
				placeholder: string;
			};
		};
		required: string;
		invalidEmail: string;
		confirmButton: string;
		backButton: string;
	};
	countries: {
		AR: string;
		BR: string;
		CO: string;
		MX: string;
		PE: string;
		CL: string;
	};
}

export interface PreviousPageTranslations {
	title: string;
	nextLink: string;
	description1: JSX.Element;
	description2: JSX.Element;
	description3: JSX.Element;
	token: {
		label: string;
		placeholder: string;
	};
	referrer: {
		label: string;
		placeholder: string;
	};
}

export interface LastPageTranslations {
	title: string;
	subtitle: string;
	backHome: string;
}
