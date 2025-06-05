import {
	Inter,
	Montserrat_Alternates,
	Open_Sans,
	Concert_One,
} from "next/font/google";

const monserratAlt = Montserrat_Alternates({
	subsets: ["latin"],
	weight: ["500", "700"],
	variable: "--font-family-monserrat_alternative",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-family-inter",
});

const openSans = Open_Sans({
	weight: ["400", "800"],
	subsets: ["latin"],
	variable: "--font-open-sans",
});

const concertOne = Concert_One({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-family-concert-one",
});

export const fontsClass = `${inter.variable} ${monserratAlt.variable} ${openSans.variable} ${concertOne.variable}`;
