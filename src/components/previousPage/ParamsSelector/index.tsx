"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useRef, useState } from "react";

import CustomFieldsCreator from "@/components/previousPage/CustomFieldsCreator";
import MockUserSelect from "@/components/previousPage/MockUserSelect";
import QueryParamsEditor from "@/components/previousPage/QueryParamsEditor";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/data/users";
import { focusInputEnd } from "@/lib/focusInputEnd";
import { PreviousPageTranslations } from "@/types/translations";

interface Properties {
	t: PreviousPageTranslations;
}

const ParamsSelector: FC<Properties> = ({ t }) => {
	const router = useRouter();
	const [referrer, setReferrer] = useState<string>("/previous-step");
	const [token, setToken] = useState<string>(Object.keys(mockUsers)[0]);
	const [encodedFields, setEncodedFields] = useState<string>("");
	const tokenInputRef = useRef<HTMLInputElement>(null);

	const handleToken = (token: string) => {
		setToken(token);
		setTimeout(() => focusInputEnd(tokenInputRef.current), 0);
	};

	const onSubmitFields = (data: string) => {
		setEncodedFields(data);
	};

	const handleRedirect = () => {
		if (!token || !referrer) return;

		const searchParams = new URLSearchParams({ token, referrer });
		if (encodedFields !== "") {
			searchParams.append("fields", encodedFields);
		}

		router.push(`/abuse-prevention?${searchParams.toString()}`);
	};

	return (
		<>
			<MockUserSelect selectToken={handleToken} currentToken={token} />
			<CustomFieldsCreator t={t} onSave={onSubmitFields} />
			<QueryParamsEditor
				t={t}
				token={token}
				referrer={referrer}
				setToken={setToken}
				setReferrer={setReferrer}
				tokenInputRef={tokenInputRef}
			/>

			<Button
				className="w-full col-span-2"
				disabled={!token || !referrer}
				onClick={handleRedirect}
			>
				{t.nextLink}
				<ArrowRight />
			</Button>
		</>
	);
};

export default ParamsSelector;
