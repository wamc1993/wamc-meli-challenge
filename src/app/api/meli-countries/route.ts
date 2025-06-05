import { NextResponse } from "next/server";

const countries = [
	{ code: "AR", name: "Argentina" },
	{ code: "BR", name: "Brazil" },
	{ code: "CO", name: "Colombia" },
	{ code: "MX", name: "Mexico" },
	{ code: "PE", name: "Peru" },
	{ code: "CL", name: "Chile" },
];

export async function GET() {
	return NextResponse.json(countries);
}
