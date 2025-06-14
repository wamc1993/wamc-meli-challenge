import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import { OpenSans } from "@/config/fonts";
import { routing } from "@/i18n/routing";

import "@/app/globals.css";

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body className={`${OpenSans.className} antialiased min-h-screen`}>
				<noscript>
					<div className="bg-yellow-100 text-yellow-900 p-4 text-center text-sm">
						Este sitio requiere JavaScript para funcionar
						correctamente. Por favor, habilítalo en tu navegador.
					</div>
				</noscript>

				<NextIntlClientProvider>
					<main className="min-h-screen bg-white px-4 py-6 sm:px-8">
						<Header />
						<div className="responsive-container">{children}</div>
					</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
