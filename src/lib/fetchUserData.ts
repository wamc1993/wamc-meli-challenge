import { MeliUserData } from "@/types/form";

export const fetchUserData = async (
	token: string
): Promise<MeliUserData | null> => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/meli-users?token=${token}`,
		{
			cache: "no-store", // ⚠️ No caché porque depende del token
		}
	);

	if (!res.ok) return null;

	return res.json();
};
