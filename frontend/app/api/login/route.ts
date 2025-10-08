import { fetchFromLaravel } from "@/lib/auth"
import { NextResponse } from "next/server"

type LoginRequestBody = {
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LoginRequestBody>
    const email = body.email?.trim()
    const password = body.password

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const baseUrl = process.env.LARAVEL_API_BASE_URL ?? "http://localhost/Laragigs/public/api"
    const targetUrl = `${baseUrl.replace(/\/$/, "")}/passport-login`


    await fetchFromLaravel("/user", {
        method: "GET",
        // No credentials sent; adjust here if your Laravel expects cookies
      });

    const laravelResponse = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      // No credentials sent; adjust here if your Laravel expects cookies
    })

    const data = await laravelResponse.json().catch(() => null)

    if (!laravelResponse.ok) {
      const message = (data as any)?.message || "Invalid credentials"
      return NextResponse.json({ message }, { status: laravelResponse.status || 401 })
    }

    const token = (data as any)?.token as string | undefined
    const user = (data as any)?.user

    if (!token) {
      return NextResponse.json({ message: "Missing token from auth server" }, { status: 502 })
    }

    const response = NextResponse.json({ user })
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // Example: 30 days
      maxAge: 60 * 60 * 24 * 30,
    })
    return response
  } catch (error) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 })
  }
}


