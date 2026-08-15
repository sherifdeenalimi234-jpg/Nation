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

export class GoogleContentService {
  private static lock = false;

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

  // Transaction locking simulation for concurrent write operations (Section 16)
  public static async writeContentRecord(record: any) {
    while (this.lock) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    this.lock = true;
    try {
      // Process write operation to spreadsheet mapping
      await new Promise((resolve) => setTimeout(resolve, 100));
      return { success: true, id: record.id || "NW-R001" };
    } finally {
      this.lock = false;
    }
  }
}
