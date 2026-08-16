/**
 * NATIONSWORLD CENTRAL CONTENT & FILE PIPELINE (GOOGLE APPS SCRIPT)
 *
 * Target Google Spreadsheet: 1F1Q5QUeFa-GYb5MoFFFZUliUqaRK5WsuQ4_1JZY_4W4
 * Target Google Drive Folder: 1OzUYFQLXCuD0-6kpm2yfUY_ZNU21uLSv
 *
 * Deployment Instructions:
 * 1. Open https://script.google.com and paste this script.
 * 2. Set SPREADSHEET_ID and ROOT_DRIVE_FOLDER_ID below.
 * 3. Deploy as Web App -> Execute as: "Me", Who has access: "Anyone".
 * 4. Copy the Web App URL into process.env.GOOGLE_APPS_SCRIPT_ENDPOINT or Next.js environment.
 */

var SPREADSHEET_ID = "1F1Q5QUeFa-GYb5MoFFFZUliUqaRK5WsuQ4_1JZY_4W4";
var ROOT_DRIVE_FOLDER_ID = "1OzUYFQLXCuD0-6kpm2yfUY_ZNU21uLSv";

var FOLDER_MAPPING = {
  "Projects": "04 — Projects",
  "Organisations": "03 — Organisations",
  "Programmes": "05 — Programmes & Events",
  "Teams": "02 — Teams",
  "Publications": "07 — Knowledge & Publications",
  "Updates": "08 — Media",
  "Impact": "09 — Submissions"
};

function doGet(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "fetchAll";
    var targetType = (e && e.parameter && e.parameter.type) ? e.parameter.type : null;

    var result = {};
    var sheetNames = ["Projects", "Organisations", "Programmes", "Teams", "Publications", "Updates", "Impact"];

    sheetNames.forEach(function(sheetName) {
      if (!targetType || targetType.toLowerCase() === sheetName.toLowerCase()) {
        var sheet = ss.getSheetByName(sheetName);
        if (sheet) {
          var data = sheet.getDataRange().getValues();
          if (data.length > 1) {
            var headers = data[0];
            var rows = [];
            for (var i = 1; i < data.length; i++) {
              var rowObj = {};
              for (var j = 0; j < headers.length; j++) {
                rowObj[headers[j]] = data[i][j];
              }
              rows.push(rowObj);
            }
            result[sheetName] = rows;
          } else {
            result[sheetName] = [];
          }
        }
      }
    });

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: result
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);
    var action = postData.action || "writeRecord";

    if (action === "uploadFile") {
      return handleFileUpload(postData);
    }

    if (action === "writeRecord" || action === "createContent") {
      return handleWriteRecord(postData);
    }

    return responseJSON({ success: false, message: "Invalid action requested" });
  } catch (err) {
    return responseJSON({ success: false, error: err.toString() });
  }
}

function handleFileUpload(data) {
  var fileData = data.file; // { name, mimeType, base64Data }
  var contentType = data.contentType || "Projects";

  if (!fileData || !fileData.base64Data) {
    return responseJSON({ success: false, message: "No file content provided" });
  }

  var folderName = FOLDER_MAPPING[contentType] || "09 — Submissions";
  var rootFolder = DriveApp.getFolderById(ROOT_DRIVE_FOLDER_ID);
  var targetFolder;

  var subfolders = rootFolder.getFoldersByName(folderName);
  if (subfolders.hasNext()) {
    targetFolder = subfolders.next();
  } else {
    targetFolder = rootFolder.createFolder(folderName);
  }

  var decodedBytes = Utilities.base64Decode(fileData.base64Data);
  var blob = Utilities.newBlob(decodedBytes, fileData.mimeType || "application/octet-stream", fileData.name || "upload");
  var createdFile = targetFolder.createFile(blob);
  createdFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return responseJSON({
    success: true,
    fileId: createdFile.getId(),
    fileUrl: createdFile.getUrl(),
    downloadUrl: createdFile.getDownloadUrl(),
    folderName: folderName
  });
}

function handleWriteRecord(data) {
  var contentType = data.contentType; // Project, Organisation, Programme, Team, Publication, Update, Impact
  var record = data.record;

  if (!contentType || !record) {
    return responseJSON({ success: false, message: "Missing contentType or record payload" });
  }

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheetName = mapToSheetName(contentType);
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    createSheetHeaders(sheet, sheetName);
  }

  var rowData = formatRecordToRow(sheetName, record);
  sheet.appendRow(rowData);

  return responseJSON({
    success: true,
    sheetName: sheetName,
    recordId: record.id,
    message: "Record successfully saved to Google Sheets"
  });
}

function mapToSheetName(type) {
  var t = type.toLowerCase();
  if (t === "project" || t === "projects") return "Projects";
  if (t === "organisation" || t === "organisations") return "Organisations";
  if (t === "programme" || t === "programmes") return "Programmes";
  if (t === "team" || t === "teams") return "Teams";
  if (t === "publication" || t === "publications") return "Publications";
  if (t === "update" || t === "updates") return "Updates";
  if (t === "impact") return "Impact";
  return "Projects";
}

function createSheetHeaders(sheet, sheetName) {
  var headers = [];
  if (sheetName === "Projects") {
    headers = ["ID", "Title", "Short Description", "Full Description", "Category", "Lead Team", "Related Organisation", "Related Programme", "Location", "Project Status", "Start Date", "End Date", "Objectives", "Key Activities", "Target Beneficiaries", "Expected Outcomes", "Impact Information", "Website Link", "Main Image URL", "Supporting Documents URL", "Creator", "Created Date", "Last Updated", "Publication Status"];
  } else if (sheetName === "Organisations") {
    headers = ["ID", "Organisation Name", "Organisation Type", "Logo URL", "Short Description", "Full Description", "Mission", "Focus Areas", "Location", "Website", "Contact Info", "Related Teams", "Related Programmes", "Related Projects", "Documents URL", "Creator", "Created Date", "Last Updated", "Publication Status"];
  } else if (sheetName === "Programmes") {
    headers = ["ID", "Programme Name", "Programme Type", "Short Description", "Full Description", "Purpose", "Objectives", "Lead Team", "Related Organisation", "Related Project", "Target Participants", "Eligibility", "Location", "Start Date", "End Date", "Registration Info", "Programme Status", "External Registration Link", "Main Image URL", "Supporting Documents URL", "Creator", "Created Date", "Last Updated", "Publication Status"];
  } else if (sheetName === "Teams") {
    headers = ["ID", "Team Name", "Team Category", "Short Description", "Full Description", "Focus Areas", "Team Image URL", "Leadership Info", "Projects", "Programmes", "Publications", "Updates", "Impact", "Creator", "Created Date", "Last Updated", "Publication Status"];
  } else if (sheetName === "Publications") {
    headers = ["ID", "Title", "Publication Type", "Authors", "Short Summary", "Full Description", "Publication Date", "Category", "Related Team", "Related Organisation", "Related Project", "Cover Image URL", "Publication File URL", "External URL", "Creator", "Created Date", "Last Updated", "Publication Status"];
  } else if (sheetName === "Updates") {
    headers = ["ID", "Title", "Short Summary", "Full Content", "Update Category", "Date", "Related Project", "Related Programme", "Related Team", "Featured Image URL", "Supporting Media URL", "External Link", "Creator", "Created Date", "Last Updated", "Publication Status"];
  } else if (sheetName === "Impact") {
    headers = ["ID", "Impact Title", "Short Summary", "Full Description", "Related Project", "Related Programme", "Related Team", "Impact Area", "Beneficiaries", "Geographic Scope", "Verified Metrics", "Evidence Documents URL", "Images URL", "Period/Date", "Creator", "Created Date", "Last Updated", "Publication Status"];
  }
  if (headers.length > 0) {
    sheet.appendRow(headers);
  }
}

function formatRecordToRow(sheetName, r) {
  if (sheetName === "Projects") {
    return [
      r.id || "", r.title || "", r.shortDescription || "", r.fullDescription || "",
      r.category || "", r.leadTeam || r.leadTeamSlug || "", r.relatedOrganisation || "", r.relatedProgramme || "",
      r.location || "", r.status || r.projectStatus || "", r.startDate || "", r.endDate || "",
      r.objectives || "", r.keyActivities || "", r.targetBeneficiaries || "", r.expectedOutcomes || "",
      r.impactInformation || "", r.externalLink || r.website || "", r.mainImageUrl || r.coverImage || "",
      r.supportingDocumentsUrl || r.fileUrl || "", r.creator || "", r.createdDate || r.date || "",
      r.lastUpdated || r.date || "", r.state || r.publicationStatus || "Published"
    ];
  } else if (sheetName === "Organisations") {
    return [
      r.id || "", r.organisationName || r.title || "", r.organisationType || r.category || "",
      r.logoUrl || r.mainImageUrl || "", r.shortDescription || "", r.fullDescription || "",
      r.mission || "", r.focusAreas || "", r.location || "", r.website || "",
      r.contactInfo || "", r.relatedTeams || "", r.relatedProgrammes || "", r.relatedProjects || "",
      r.documentsUrl || r.fileUrl || "", r.creator || "", r.createdDate || r.date || "",
      r.lastUpdated || r.date || "", r.state || r.publicationStatus || "Published"
    ];
  } else if (sheetName === "Programmes") {
    return [
      r.id || "", r.programmeName || r.title || "", r.programmeType || r.type || "",
      r.shortDescription || "", r.fullDescription || "", r.purpose || "", r.objectives || "",
      r.leadTeam || r.leadTeamSlug || "", r.relatedOrganisation || "", r.relatedProject || "",
      r.targetParticipants || "", r.eligibility || "", r.location || "", r.startDate || r.date || "",
      r.endDate || "", r.registrationInfo || "", r.status || r.programmeStatus || "",
      r.externalRegistrationLink || r.externalLink || "", r.mainImageUrl || r.coverImage || "",
      r.supportingDocumentsUrl || r.fileUrl || "", r.creator || "", r.createdDate || r.date || "",
      r.lastUpdated || r.date || "", r.state || r.publicationStatus || "Published"
    ];
  } else if (sheetName === "Teams") {
    return [
      r.id || "", r.teamName || r.title || "", r.teamCategory || r.category || "",
      r.shortDescription || "", r.fullDescription || "", r.focusAreas || "",
      r.teamImageUrl || r.mainImageUrl || "", r.leadershipInfo || "", r.projects || "",
      r.programmes || "", r.publications || "", r.updates || "", r.impact || "",
      r.creator || "", r.createdDate || r.date || "", r.lastUpdated || r.date || "",
      r.state || r.publicationStatus || "Published"
    ];
  } else if (sheetName === "Publications") {
    return [
      r.id || "", r.title || "", r.publicationType || r.type || r.category || "",
      Array.isArray(r.authors) ? r.authors.join(", ") : (r.authors || ""),
      r.shortSummary || r.shortDescription || "", r.fullDescription || "",
      r.publicationDate || r.date || "", r.topic || r.category || "",
      r.relatedTeam || r.leadTeamSlug || "", r.relatedOrganisation || "", r.relatedProject || r.relatedProjectSlug || "",
      r.coverImageUrl || r.coverImage || "", r.publicationFileUrl || r.fileUrl || "",
      r.externalUrl || r.externalLink || "", r.creator || "", r.createdDate || r.date || "",
      r.lastUpdated || r.date || "", r.state || r.publicationStatus || "Published"
    ];
  } else if (sheetName === "Updates") {
    return [
      r.id || "", r.title || "", r.shortSummary || r.shortDescription || "",
      r.fullContent || r.fullDescription || "", r.updateCategory || r.type || r.category || "",
      r.date || "", r.relatedProject || r.relatedSlug || "", r.relatedProgramme || "",
      r.relatedTeam || "", r.featuredImageUrl || r.imageUrl || "", r.supportingMediaUrl || r.fileUrl || "",
      r.externalLink || "", r.creator || "", r.createdDate || r.date || "",
      r.lastUpdated || r.date || "", r.state || r.publicationStatus || "Published"
    ];
  } else if (sheetName === "Impact") {
    return [
      r.id || "", r.impactTitle || r.title || "", r.shortSummary || r.shortDescription || "",
      r.fullDescription || "", r.relatedProject || "", r.relatedProgramme || "",
      r.relatedTeam || "", r.impactArea || "", r.beneficiaries || "",
      r.geographicScope || "", r.verifiedMetrics || r.value || "", r.evidenceDocumentsUrl || r.fileUrl || "",
      r.imagesUrl || r.mainImageUrl || "", r.periodDate || r.date || r.lastUpdated || "",
      r.creator || "", r.createdDate || r.date || "", r.lastUpdated || r.date || "",
      r.state || r.publicationStatus || "Published"
    ];
  }
  return [];
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
