import { NextRequest, NextResponse } from "next/server";

/**
 * API Route to get user's country
 *
 * Uses Vercel's geo headers to detect the user's country.
 * Falls back to "UNKNOWN" if not available.
 *
 * @see https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-country
 */
export async function GET(request: NextRequest) {
  try {
    // Vercel provides geo information via headers
    const country = request.headers.get("x-vercel-ip-country") || "UNKNOWN";

    // Also get other useful geo data
    const city = request.headers.get("x-vercel-ip-city");
    const region = request.headers.get("x-vercel-ip-country-region");
    const latitude = request.headers.get("x-vercel-ip-latitude");
    const longitude = request.headers.get("x-vercel-ip-longitude");

    return NextResponse.json(
      {
        country,
        city,
        region,
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error) {
    console.error("Error detecting country:", error);
    return NextResponse.json(
      {
        country: "UNKNOWN",
        error: "Failed to detect country",
      },
      { status: 500 }
    );
  }
}

// Enable Edge Runtime for better performance
export const runtime = "edge";
