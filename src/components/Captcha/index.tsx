"use client";
import { useLocale } from "next-intl";
import { FC, useEffect, useRef, useState } from "react";

const Captcha: FC = () => {
	const locale = useLocale();
	const containerRef = useRef<HTMLDivElement>(null);
	const [isReady, setIsReady] = useState(false);
	const scriptId = "recaptcha-script";

	useEffect(() => {
		const existingScript = document.getElementById(scriptId);
		if (existingScript) {
			existingScript.remove();
			delete window.grecaptcha;
			containerRef.current?.replaceChildren();
		}

		setIsReady(false);

		const script = document.createElement("script");
		script.src = `https://www.google.com/recaptcha/api.js?hl=${locale}`;
		script.async = true;
		script.defer = true;
		script.id = scriptId;
		script.onload = () => {
			setTimeout(() => {
				setIsReady(true);
			}, 200);
		};
		document.body.appendChild(script);
	}, [locale]);

	useEffect(() => {
		if (
			isReady &&
			window.grecaptcha &&
			typeof window.grecaptcha.render === "function" &&
			containerRef.current &&
			containerRef.current.childNodes.length === 0
		) {
			window.grecaptcha.render(containerRef.current, {
				sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY!,
			});
			console.log("Captcha renderizado correctamente");
		}
	}, [isReady]);

	return <div ref={containerRef} className="flex justify-center" />;
};

export default Captcha;
