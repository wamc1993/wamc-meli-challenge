import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

import {
	AbusePreventionTranslations,
	LastPageTranslations,
	PreviousPageTranslations,
} from "@/types/translations";

export async function getAbusePreventionTranslations() {
	const t = await getTranslations();
	return {
		invalidToken: {
			title: t("abuse-prevention-page.invalid-token.title"),
			message: t("abuse-prevention-page.invalid-token.message"),
		},
		noAccess: {
			title: t("abuse-prevention-page.no-access.title"),
			message: t("abuse-prevention-page.no-access.message"),
		},
		default: {
			title: t("abuse-prevention-page.default.title"),
			subtitle: t("abuse-prevention-page.default.subtitle"),
			fields: {
				fullName: {
					label: t(
						"abuse-prevention-page.default.fields.fullName.label"
					),
					placeholder: t(
						"abuse-prevention-page.default.fields.fullName.placeholder"
					),
				},
				email: {
					label: t(
						"abuse-prevention-page.default.fields.email.label"
					),
					placeholder: t(
						"abuse-prevention-page.default.fields.email.placeholder"
					),
				},
				country: {
					label: t(
						"abuse-prevention-page.default.fields.country.label"
					),
					placeholder: t(
						"abuse-prevention-page.default.fields.country.placeholder"
					),
				},
				address: {
					label: t(
						"abuse-prevention-page.default.fields.address.label"
					),
					placeholder: t(
						"abuse-prevention-page.default.fields.address.placeholder"
					),
				},
			},
			required: t("abuse-prevention-page.default.required-error"),
			invalidEmail: t(
				"abuse-prevention-page.default.invalid-email-error"
			),
			confirmButton: t("abuse-prevention-page.default.confirm-button"),
			backButton: t("abuse-prevention-page.default.back-button"),
		},
		countries: {
			AR: t("countries.AR"),
			BR: t("countries.BR"),
			CO: t("countries.CO"),
			MX: t("countries.MX"),
			PE: t("countries.PE"),
			CL: t("countries.CL"),
		},
	} as AbusePreventionTranslations;
}

export async function getPreviousPageTranslations() {
	const t = await getTranslations("previous-page");

	const mapper = {
		token: (chunks: ReactNode) => (
			<strong className="ml-1">{chunks}</strong>
		),
		referrer: (chunks: ReactNode) => (
			<strong className="ml-1">{chunks}</strong>
		),
		user: (chunks: ReactNode) => <em>{chunks}</em>,
	};
	const description1 = <p>{t.rich("description-1", mapper)}</p>;
	const description2 = <p>{t.rich("description-2", mapper)}</p>;
	const description3 = <p>{t.rich("description-3", mapper)}</p>;

	return {
		title: t("title"),
		nextLink: t("next-link"),
		description1,
		description2,
		description3,
		token: {
			label: t("token.label"),
			placeholder: t("token.placeholder"),
		},
		referrer: {
			label: t("referrer.label"),
			placeholder: t("referrer.placeholder"),
		},
	} as PreviousPageTranslations;
}

export async function getLastPageTranslations() {
	const t = await getTranslations("last-page");
	return {
		title: t("title"),
		subtitle: t("subtitle"),
		backHome: t("backHome"),
	} as LastPageTranslations;
}
