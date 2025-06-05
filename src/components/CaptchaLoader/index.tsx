"use client";
import dynamic from "next/dynamic";
import { FC, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";

const Captcha = dynamic(() => import("@/components/Captcha"), {
	ssr: false,
	loading: () => <Spinner className="h-10 w-10" />,
});

const CaptchaLoader: FC = () => {
	const [visible, setVisible] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ref.current || visible) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [visible]);

	return (
		<div
			ref={ref}
			className={cn(
				"min-h-[80px] transition-opacity duration-300 flex items-center justify-center",
				{
					"opacity-50": !visible,
					"opacity-100": visible,
				}
			)}
		>
			{visible ? <Captcha /> : <Spinner className="h-10 w-10" />}
		</div>
	);
};

export default CaptchaLoader;
