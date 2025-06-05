import ParamsSelector from "@/components/ParamsSelector";
import Stepper from "@/components/Stepper";
import { getPreviousPageTranslations } from "@/lib/translations";

export default async function PreviousPage() {
	const t = await getPreviousPageTranslations();

	return (
		<div className="flex flex-col gap-6">
			<Stepper title={t.title} />
			<div>
				{t.description1}
				{t.description2}
				{t.description3}
			</div>
			<ParamsSelector />
		</div>
	);
}
