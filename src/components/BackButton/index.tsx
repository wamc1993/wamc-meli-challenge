"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

import { Button } from "@/components/ui/button";

interface Properties {
	label: string;
	referrer?: string;
	className?: string;
}

const BackButton: FC<Properties> = ({ referrer, className, label }) => {
	const router = useRouter();
	const locale = useLocale();

	const handleBack = useCallback(() => {
		if (referrer) {
			const path = referrer.startsWith("/") ? referrer : `/${referrer}`;
			router.push(`/${locale}${path}`);
		} else {
			router.back();
		}
	}, [referrer, router, locale]);

	return (
		<Button
			type="button"
			onClick={handleBack}
			className={className}
			aria-label={label}
			disabled={!referrer}
		>
			{label}
		</Button>
	);
};

export default BackButton;
