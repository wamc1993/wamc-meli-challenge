"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const activeLocale = useLocale();
	const searchParams = useSearchParams();

	const handleSwitch = (locale: "es" | "pt") => {
		const query = searchParams.toString();
		const fullPath = query ? `${pathname}?${query}` : pathname;
		router.replace(fullPath, { locale });
		window.location.href = `/${locale}${fullPath}`;
	};

	return (
		<div className="flex gap-2">
			<Button
				onClick={() => handleSwitch("es")}
				variant={activeLocale === "es" ? "default" : "outline"}
				className={cn("px-3 py-1 border rounded text-sm")}
			>
				ES
				<div className="w-4 h-4 rounded-full overflow-hidden">
					<Image
						src="https://flagcdn.com/w40/co.png"
						alt="Bandera de Colombia"
						width={18}
						height={18}
						className="object-cover w-full h-full"
						priority
					/>
				</div>
			</Button>
			<Button
				onClick={() => handleSwitch("pt")}
				variant={activeLocale === "pt" ? "default" : "outline"}
				className="px-3 py-1 border rounded text-sm"
			>
				PT
				<div className="w-4 h-4 rounded-full overflow-hidden">
					<Image
						src="https://flagcdn.com/w40/br.png"
						alt="Bandera de Brasil"
						width={18}
						height={18}
						className="object-cover w-full h-full"
						priority
					/>
				</div>
			</Button>
		</div>
	);
}
