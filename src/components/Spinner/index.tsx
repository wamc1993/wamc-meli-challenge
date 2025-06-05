import React, { FC } from "react";

import { cn } from "@/lib/utils";

interface Properties {
	className?: string;
}
const Spinner: FC<Properties> = ({ className }) => {
	return (
		<div
			className={cn(
				`w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin`,
				className
			)}
		/>
	);
};

export default Spinner;
