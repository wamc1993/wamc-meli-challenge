import { NextRequest, NextResponse } from "next/server";

import { mockUsers } from "@/data/users";

export async function GET(req: NextRequest) {
	const token = req.nextUrl.searchParams.get("token");

	if (!token || !mockUsers[token]) {
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });
	}

	return NextResponse.json(mockUsers[token]);
}
