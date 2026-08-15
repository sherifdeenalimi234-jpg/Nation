import { NextRequest, NextResponse } from "next/server";
import { isServerAuthorised, getDriveFolderForSector } from "@/lib/serverAuth";
import { GoogleContentService } from "@/lib/googleContentService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sector = searchParams.get("sector") || "all";

  if (sector === "projects") {
    const data = await GoogleContentService.getPublicProjects();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "teams") {
    const data = await GoogleContentService.getPublicTeams();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "publications") {
    const data = await GoogleContentService.getPublicPublications();
    return NextResponse.json({ success: true, data });
  }

  // Default return all public items
  const projects = await GoogleContentService.getPublicProjects();
  const teams = await GoogleContentService.getPublicTeams();
  const publications = await GoogleContentService.getPublicPublications();

  return NextResponse.json({
    success: true,
    data: { projects, teams, publications },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, record, sector } = body;

    // Server-side independent permission check (Section 12: Authentication Security)
    if (!isServerAuthorised(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Access Restricted: This account is not authorised to create or publish content.",
        },
        { status: 403 }
      );
    }

    if (!record || !record.title) {
      return NextResponse.json(
        { success: false, message: "Validation Error: Title and required fields are missing." },
        { status: 400 }
      );
    }

    const driveFolder = getDriveFolderForSector(sector || record.type || "projects");
    const writeResult = await GoogleContentService.writeContentRecord(record);

    return NextResponse.json({
      success: true,
      message: "Published Successfully: Content is now available on NationsWorld.",
      recordId: writeResult.id,
      driveDestination: driveFolder,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "We couldn't complete the publication. Your information has not been published. Please try again.",
      },
      { status: 500 }
    );
  }
}
