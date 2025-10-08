import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export function getLaravelBaseUrl(): string {
  const base = process.env.LARAVEL_API_BASE_URL ?? "http://localhost/Laragigs/public/api"
  return base.replace(/\/$/, "")
}

export function getAuthToken(): string | null {
  try {
    return cookies().get("auth_token")?.value ?? null
  } catch {
    return null
  }
}

export function getAuthTokenFromRequest(request: NextRequest): string | null {
  try {
    return request.cookies.get("auth_token")?.value ?? null
  } catch {
    return null
  }
}

type FetchOptions = {
  method?: string
  headers?: Record<string, string>
  body?: any
}

export async function fetchFromLaravel(path: string, options: FetchOptions = {}, token?: string | null) {
  const url = `${getLaravelBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }
  const bearer = token ?? getAuthToken()
  if (bearer) {
    headers["Authorization"] = `Bearer ${bearer}`
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? (typeof options.body === "string" ? options.body : JSON.stringify(options.body)) : undefined,
    // same-origin; cookies not needed to be forwarded when using token
  })

  return res
}


