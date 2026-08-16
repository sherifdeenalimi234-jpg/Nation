import { NextRequest, NextResponse } from "next/server";
import { isServerAuthorised, getDriveFolderForSector } from "@/lib/serverAuth";
import { GoogleContentService } from "@/lib/googleContentService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sector = searchParams.get("sector") || "all";

  if (sector === "projects" || sector === "project") {
    const data = await GoogleContentService.getPublicProjects();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "organisations" || sector === "organisation") {
    const data = await GoogleContentService.getPublicOrganisations();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "programmes" || sector === "programme") {
    const data = await GoogleContentService.getPublicProgrammes();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "teams" || sector === "team") {
    const data = await GoogleContentService.getPublicTeams();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "publications" || sector === "publication") {
    const data = await GoogleContentService.getPublicPublications();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "updates" || sector === "update") {
    const data = await GoogleContentService.getPublicUpdates();
    return NextResponse.json({ success: true, data });
  }

  if (sector === "impact") {
    const data = await GoogleContentService.getPublicImpactMetrics();
    return NextResponse.json({ success: true, data });
  }

  // Fetch all public items
  const projects = await GoogleContentService.getPublicProjects();
  const organisations = await GoogleContentService.getPublicOrganisations();
  const programmes = await GoogleContentService.getPublicProgrammes();
  const teams = await GoogleContentService.getPublicTeams();
  const publications = await GoogleContentService.getPublicPublications();
  const updates = await GoogleContentService.getPublicUpdates();
  const impact = await GoogleContentService.getPublicImpactMetrics();

  return NextResponse.json({
    success: true,
    data: { projects, organisations, programmes, teams, publications, updates, impact },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const body = await req.json();
    const { email, record, contentType, filePayload } = body;

    // Server-side independent authorization check
    if (!isServerAuthorised(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Access Restricted: This account is not authorised to create or publish content.",
        },
        { status: 403 }
      );
    }

    // Action 1: Upload file to Google Drive
    if (action === "uploadFile") {
      if (!filePayload || !filePayload.base64Data) {
        return NextResponse.json(
          { success: false, message: "Validation Error: File payload missing." },
          { status: 400 }
        );
      }

      const uploadResult = await GoogleContentService.uploadFileToDrive(filePayload, contentType || "Projects");
      return NextResponse.json({
        success: true,
        fileUrl: uploadResult.fileUrl,
        fileId: uploadResult.fileId,
        folderName: uploadResult.folderName,
      });
    }

    // Action 2: Write record to Google Sheets and publish
    if (!record || (!record.projectTitle && !record.organisationName && !record.programmeName && !record.teamName && !record.title && !record.impactTitle)) {
      return NextResponse.json(
        { success: false, message: "Validation Error: Record content or required title fields are missing." },
        { status: 400 }
      );
    }

    const type = contentType || record.type || "Project";
    const driveFolder = getDriveFolderForSector(type);
    const writeResult = await GoogleContentService.writeContentRecord(record, type);

    if (!writeResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: writeResult.error || "Google Sheets transaction failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Published Successfully: Content is now live and stored in Google Sheets and Google Drive.",
      recordId: writeResult.id,
      driveDestination: driveFolder,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `We couldn't complete the publication: ${error.message || error}`,
      },
      { status: 500 }
    );
  }
}
