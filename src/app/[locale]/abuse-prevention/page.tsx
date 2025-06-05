import { ReactNode } from "react";

import FormErrorContent from "@/components/FormErrorContent";
import FormWithSkeleton from "@/components/FormWithSkeleton";
import Stepper from "@/components/Stepper";
import { fetchCountries } from "@/lib/fetchCountries";
import { fetchUserData } from "@/lib/fetchUserData";
import { getAbusePreventionTranslations } from "@/lib/translations";
import { validateReferrer, validateToken } from "@/lib/validateParams";

interface AbusePreventionPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AbusePreventionPage({
	searchParams,
}: AbusePreventionPageProps) {
	const params = await searchParams;
	const t = await getAbusePreventionTranslations();

	const countries = await fetchCountries(t);
	const token = params.token as string | undefined;
	const referrer = params.referrer as string | undefined;

	const isValidToken = validateToken(token);
	const isValidReferrer = validateReferrer(referrer);

	let content: ReactNode;

	if (!isValidReferrer || !isValidToken) {
		content = (
			<FormErrorContent
				backText={t.default.backButton}
				message={t.noAccess.message}
				title={t.noAccess.title}
			/>
		);
	} else {
		const userData = await fetchUserData(token!);
		if (!userData) {
			content = (
				<FormErrorContent
					backText={t.default.backButton}
					message={t.invalidToken.message}
					title={t.invalidToken.title}
				/>
			);
		} else {
			content = (
				<>
					<p className="mb-4">{t.default.subtitle}</p>
					<FormWithSkeleton
						t={t}
						defaultValues={{ ...userData, referrer, token }}
						countries={countries}
					/>
				</>
			);
		}
	}

	return (
		<main className="flex flex-col gap-6">
			<Stepper title={t.default.title} />
			{content}
		</main>
	);
}
