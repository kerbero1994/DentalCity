import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

/**
 * Test endpoint to verify Sentry is working
 * GET /api/sentry-test
 *
 * This endpoint intentionally throws an error to test Sentry integration.
 * Only use in development/staging environments.
 */
export async function GET() {
  try {
    // Log that we're testing Sentry
    console.log("Testing Sentry error tracking...");

    // Capture a test message
    Sentry.captureMessage("Sentry test message from SITIMM", "info");

    // Throw a test error
    throw new Error("This is a test error from SITIMM - Sentry is working correctly!");
  } catch (error) {
    // Capture the error in Sentry
    Sentry.captureException(error);

    // Return response
    return NextResponse.json(
      {
        success: true,
        message: "Test error sent to Sentry",
        note: "Check your Sentry dashboard to see if the error was captured",
        environment: process.env.NODE_ENV,
        sentryDsnConfigured: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
      },
      { status: 200 },
    );
  }
}

// Enable Edge Runtime
export const runtime = "edge";
