// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, saveUser } from "@/libs/usersDb";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  await saveUser({ name, email, password });
  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
