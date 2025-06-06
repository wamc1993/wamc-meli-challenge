export const metadata = {
	title: {
		default: "POC Meli Challenge",
		template: "%s | POC Meli Challenge",
	},
	description: "Prueba de concepto técnica para el Meli Frontend Challenge.",
	authors: [{ name: "William Montañez" }],
	creator: "William Montañez",
	applicationName: "POC Meli Challenge",
	keywords: ["meli", "challenge", "frontend", "poc", "nextjs", "react"],
	openGraph: {
		title: "POC Meli Challenge",
		description: "Prueba de concepto técnica creada por William Montañez.",
		url: "https://wamc-meli-challenge.netlify.app/",
		siteName: "POC Meli Challenge",
		locale: "es_CO",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
