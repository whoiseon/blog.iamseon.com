import { NextResponse, type NextRequest } from "next/server";

import { getPosts } from "@/app/api/_lib/services/posts.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") ?? "post";
  const cursor = searchParams.get("cursor") ?? undefined;

  const { error, payload } = await getPosts(type, cursor);

  if (error) {
    return NextResponse.json({ error, payload: null }, { status: 502 });
  }

  return NextResponse.json({ error: null, payload });
}
