import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

import { Button } from "@/components/ui/button";

interface Properties {
	title: string;
	message: string;
	backText: string;
}

const FormErrorContent: FC<Properties> = ({ title, message, backText }) => {
	return (
		<>
			<div className="self-center">
				<h2 className="title-error">{title}</h2>
				<p className="subtitle-error">{message}</p>
			</div>
			<Link className="self-center" href="/previous-step">
				<Button>
					{backText}
					<ArrowLeft />
				</Button>
			</Link>
		</>
	);
};

export default FormErrorContent;
