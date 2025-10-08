import { NextResponse } from "next/server"
import { fetchFromLaravel } from "@/lib/auth"

export async function GET() {
  try {
    // Example: adjust to your Laravel endpoint that returns authenticated user
    const res = await fetchFromLaravel("/user")
    if (!res.ok) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 })
  }
}


