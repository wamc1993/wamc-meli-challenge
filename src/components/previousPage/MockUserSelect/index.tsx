"use client";
import { FC } from "react";

import { StepLabel } from "@/components/previousPage/StepLabel";
import { mockUsers } from "@/data/users";
import { cn } from "@/lib/utils";

interface Properties {
	currentToken: string;
	selectToken: (token: string) => void;
}

const MockUserSelect: FC<Properties> = ({ currentToken, selectToken }) => {
	return (
		<div>
			<StepLabel number={1}>Selecciona un usuario</StepLabel>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{Object.entries(mockUsers).map(([token, user]) => (
					<div
						key={token}
						className={cn(
							"border-2 p-4 rounded-md cursor-pointer transition-all duration-300 box-border",
							{
								"border-solid bg-amber-200 border-gray-600":
									currentToken === token,
								"border-dashed bg-amber-50 hover:bg-amber-100":
									currentToken !== token,
							}
						)}
						onClick={() => selectToken(token)}
					>
						<p className="font-semibold text-lg select-none">
							{user.fullName || "Sin nombre"}
						</p>
						<p className="user-attr">Token: {token}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default MockUserSelect;
