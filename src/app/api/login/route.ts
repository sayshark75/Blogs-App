import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/libs/usersDb";
import { signToken } from "@/libs/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ email, name: user.name });

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });

  return res;
}
