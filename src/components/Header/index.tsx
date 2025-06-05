import React, { FC } from "react";

import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header: FC = () => {
	return (
		<header className="w-full pb-3 border-b">
			<div className="responsive-container flex justify-between">
				<h1 className="text-2xl font-bold">Will App</h1>
				<LanguageSwitcher />
			</div>
		</header>
	);
};

export default Header;
