"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Button } from "@/components/ui/button";

interface Properties {
	label: string;
	referrer?: string;
	className?: string;
}

const BackButton: FC<Properties> = ({ referrer, className, label }) => {
	const router = useRouter();
	const locale = useLocale();

	const handleBack = () => {
		referrer && router.push(`/${locale}${referrer}`);
	};

	return (
		<Button type="button" onClick={handleBack} className={className}>
			{label}
		</Button>
	);
};

export default BackButton;
