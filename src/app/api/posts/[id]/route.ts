import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
    const data: BlogsType[] = await res.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json({ error: "Server error", messaage: (error as Error).message }, { status: 500 });
  }
}
