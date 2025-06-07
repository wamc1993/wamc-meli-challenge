"use client";
import React, { FC } from "react";

import { StepLabel } from "@/components/previousPage/StepLabel";
import { Input } from "@/components/ui/input";
import { PreviousPageTranslations } from "@/types/translations";

interface Properties {
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	referrer: string;
	setReferrer: React.Dispatch<React.SetStateAction<string>>;
	tokenInputRef: React.RefObject<HTMLInputElement | null>;
	t: PreviousPageTranslations;
}

const QueryParamsEditor: FC<Properties> = ({
	t,
	token,
	setToken,
	referrer,
	setReferrer,
	tokenInputRef,
}) => {
	return (
		<div>
			<StepLabel number={3}>{t.step3}</StepLabel>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label htmlFor="token">{t.token.label}</label>
					<Input
						ref={tokenInputRef}
						name="token"
						placeholder={t.token.placeholder}
						value={token}
						onChange={(e) => setToken(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="referrer">{t.referrer.label}</label>
					<Input
						name="referrer"
						placeholder={t.referrer.placeholder}
						value={referrer}
						onChange={(e) => setReferrer(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default QueryParamsEditor;
