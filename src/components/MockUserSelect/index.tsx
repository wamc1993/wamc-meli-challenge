"use client";
import { FC } from "react";

import { mockUsers } from "@/data/users";
import { cn } from "@/lib/utils";

interface Properties {
	currentToken: string;
	selectToken: (token: string) => void;
}

const MockUserSelect: FC<Properties> = ({ currentToken, selectToken }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
					<p className="user-attr">{user.email || "Sin email"}</p>
					<p className="user-attr">
						{user.address || "Sin dirección"}
					</p>
					<p className="user-attr">
						País: {user.country || "Sin país"}
					</p>
					<p className="user-attr">Token: {token}</p>
				</div>
			))}
		</div>
	);
};

export default MockUserSelect;
