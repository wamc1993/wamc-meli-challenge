import { MeliCountry } from "@/types/form";
import type { AbusePreventionTranslations } from "@/types/translations";

export const fetchCountries = async (
	t: AbusePreventionTranslations
): Promise<MeliCountry[]> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/meli-countries`,
		{
			next: { revalidate: 86400 }, // 1 día en segundos
		}
	);

	if (!res.ok) {
		throw new Error("No se pudo obtener la lista de países");
	}

	const countries: MeliCountry[] = await res.json();
	return countries.map(({ code, name }: MeliCountry) => ({
		code,
		name: t.countries[code as keyof typeof t.countries] || name,
	}));
};
