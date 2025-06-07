import dynamic from "next/dynamic";
import { FC, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";

const Captcha = dynamic(() => import("@/components/abusePrevention/Captcha"), {
	ssr: false,
	loading: () => <Spinner className="h-10 w-10" />,
});

const CaptchaLoader: FC = () => {
	const [visible, setVisible] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (!ref.current || visible) return;

		observerRef.current = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observerRef.current?.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		observerRef.current.observe(ref.current);

		return () => observerRef.current?.disconnect();
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
			aria-busy={!visible}
			role="region"
			aria-label="Captcha de seguridad"
		>
			{visible ? <Captcha /> : <Spinner className="h-10 w-10" />}
		</div>
	);
};

export default CaptchaLoader;
