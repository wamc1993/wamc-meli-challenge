"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, Fragment } from "react";

import { cn } from "@/lib/utils";

interface Properties {
	title: string;
}

const PAGES = ["/previous-step", "/abuse-prevention", "/last-step"];

const Stepper: FC<Properties> = ({ title }) => {
	const router = useRouter();
	const pathname = usePathname();
	const currentStep = PAGES.findIndex((p) => pathname.includes(p));

	const onGoTo = (url: string) => router.push(url);

	return (
		<div className="grid grid-cols-2 w-full">
			<h1 className="text-2xl font-semibold">{title}</h1>
			<div className="flex items-center">
				{PAGES.map((page, index) => {
					const isActive = index === currentStep;
					const isCompleted = index < currentStep;

					const onClick = isCompleted
						? () => onGoTo(page)
						: undefined;

					return (
						<Fragment key={index}>
							<div
								onClick={onClick}
								className={cn(
									"w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all",
									{
										"bg-primary text-white border-primary":
											isActive,
										"bg-white text-primary border-primary cursor-pointer":
											isCompleted,
										"bg-muted text-muted-foreground border-border":
											!isActive && !isCompleted,
									}
								)}
							>
								<p className="select-none">{index + 1}</p>
							</div>

							{index < PAGES.length - 1 && (
								<div className="flex-1 h-1 mx-2 bg-border select-none" />
							)}
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Stepper;
