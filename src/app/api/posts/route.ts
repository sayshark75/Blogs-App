import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit")) || 1;
    const skip = Number(searchParams.get("skip")) || 10;

    const res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
    const data: BlogsType[] = await res.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json({ error: "Server error", messaage: (error as Error).message }, { status: 500 });
  }
}
