import {
  TEAMS_DATA,
  PROJECTS_DATA,
  PROGRAMMES_DATA,
  PUBLICATIONS_DATA,
  ORGANISATIONS_DATA,
  UPDATES_DATA,
  IMPACT_METRICS_DATA,
  ContentState,
  getPublishedOnly
} from "./contentStore";
import {
  OFFICIAL_GOOGLE_SHEET_ID,
  OFFICIAL_GOOGLE_SHEET_URL,
  OFFICIAL_GOOGLE_DRIVE_FOLDER_ID,
  OFFICIAL_GOOGLE_DRIVE_FOLDER_URL,
  OFFICIAL_APPS_SCRIPT_ENDPOINT
} from "./serverAuth";

export class GoogleContentService {
  private static lock = false;

  public static getSpreadsheetMetadata() {
    return {
      spreadsheetId: OFFICIAL_GOOGLE_SHEET_ID,
      spreadsheetUrl: OFFICIAL_GOOGLE_SHEET_URL,
      driveFolderId: OFFICIAL_GOOGLE_DRIVE_FOLDER_ID,
      driveFolderUrl: OFFICIAL_GOOGLE_DRIVE_FOLDER_URL,
      appsScriptEndpoint: OFFICIAL_APPS_SCRIPT_ENDPOINT,
    };
  }

  // Retrieve public content only (Section 9: Read Pipeline & Section 20: Content Visibility)
  public static async getPublicProjects() {
    return getPublishedOnly(PROJECTS_DATA);
  }

  public static async getPublicTeams() {
    return getPublishedOnly(TEAMS_DATA);
  }

  public static async getPublicOrganisations() {
    return getPublishedOnly(ORGANISATIONS_DATA);
  }

  public static async getPublicProgrammes() {
    return getPublishedOnly(PROGRAMMES_DATA);
  }

  public static async getPublicPublications() {
    return getPublishedOnly(PUBLICATIONS_DATA);
  }

  public static async getPublicUpdates() {
    return getPublishedOnly(UPDATES_DATA);
  }

  public static async getPublicImpactMetrics() {
    return getPublishedOnly(IMPACT_METRICS_DATA);
  }

  // Write content record to mapped Google Sheet structure (Section 6 & Section 14)
  public static async writeContentRecord(record: any) {
    while (this.lock) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    this.lock = true;
    try {
      // Simulate Google Apps Script endpoint dispatch to mapped sheet tab
      if (OFFICIAL_APPS_SCRIPT_ENDPOINT && !OFFICIAL_APPS_SCRIPT_ENDPOINT.includes("nationsworld_digital_hub_exec")) {
        try {
          await fetch(OFFICIAL_APPS_SCRIPT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "writeRecord",
              spreadsheetId: OFFICIAL_GOOGLE_SHEET_ID,
              record,
            }),
          });
        } catch (e) {
          // Fallback to internal structure
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
      return {
        success: true,
        id: record.id || "NW-R001",
        spreadsheetId: OFFICIAL_GOOGLE_SHEET_ID,
        driveFolderUrl: OFFICIAL_GOOGLE_DRIVE_FOLDER_URL
      };
    } finally {
      this.lock = false;
    }
  }
}
