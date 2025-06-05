"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useRef, useState } from "react";

import MockUserSelect from "@/components/MockUserSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUsers } from "@/data/users";
import { focusInputEnd } from "@/lib/focusInputEnd";

const ParamsSelector: FC = () => {
	const router = useRouter();
	const [referrer, setReferrer] = useState<string>("/previous-step");
	const [token, setToken] = useState<string>(Object.keys(mockUsers)[0]);
	const tokenInputRef = useRef<HTMLInputElement>(null);

	const handleToken = (token: string) => {
		setToken(token);
		setTimeout(() => focusInputEnd(tokenInputRef.current), 0);
	};

	const handleRedirect = () => {
		if (!token || !referrer) return;
		const searchParams = new URLSearchParams({ token, referrer });
		router.push(`/abuse-prevention?${searchParams.toString()}`);
	};

	return (
		<>
			<MockUserSelect selectToken={handleToken} currentToken={token} />
			<hr />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label htmlFor="token">Token del usuario</label>
					<Input
						ref={tokenInputRef}
						name="token"
						placeholder="Token del usuario"
						value={token}
						onChange={(e) => setToken(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="referrer">Ruta anterior</label>
					<Input
						name="referrer"
						placeholder="Referrer (ej: /previous-step)"
						value={referrer}
						onChange={(e) => setReferrer(e.target.value)}
					/>
				</div>
			</div>
			<Button
				className="w-full col-span-2"
				disabled={!token || !referrer}
				onClick={handleRedirect}
			>
				Continuar al paso de verificación
				<ArrowRight />
			</Button>
		</>
	);
};

export default ParamsSelector;
