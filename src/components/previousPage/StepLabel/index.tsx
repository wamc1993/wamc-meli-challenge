"use client";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StepLabelProps {
	number: number;
	children: ReactNode;
	className?: string;
}

export function StepLabel({ number, children, className }: StepLabelProps) {
	return (
		<div>
			<hr />
			<div className={cn("flex items-center gap-4 my-1", className)}>
				<div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm select-none">
					{number}
				</div>
				<h2 className="text-lg font-semibold">{children}</h2>
			</div>
		</div>
	);
}
