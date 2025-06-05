import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import Stepper from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import { getLastPageTranslations } from "@/lib/translations";

export default async function LastPage() {
	const t = await getLastPageTranslations();

	return (
		<main className="flex flex-col gap-6">
			<Stepper title={t.title} />
			<p className="self-center">{t.subtitle}</p>
			<Link className="self-center" href="/previous-step">
				<Button>
					{t.backHome}
					<ArrowLeft />
				</Button>
			</Link>
		</main>
	);
}
