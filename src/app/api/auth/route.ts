import { NextRequest, NextResponse } from "next/server";
import { isServerAuthorised } from "@/lib/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const authorised = isServerAuthorised(email);

    if (!authorised) {
      return NextResponse.json(
        {
          success: false,
          message: "Access Restricted: This Google account is not authorised to create or publish NationsWorld content.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      email,
      message: "Creator Account Authenticated Successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication check failed. Please try again." },
      { status: 500 }
    );
  }
}
