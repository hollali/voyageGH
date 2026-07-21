import { NextResponse } from "next/server";
import { validateAdminCredentials, setAdminSession } from "~/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const session = await validateAdminCredentials(email, password);
    if (!session) {
      return NextResponse.json({ error: "Invalid credentials or not an admin account" }, { status: 401 });
    }

    await setAdminSession(session);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
