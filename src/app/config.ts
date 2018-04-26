//apiUrlDev = "http://136.140.193.16:10005/jwt/api/authentication/demoauth";
//apiUrlProd = "http://198.180.251.216:10005/jwt/api/authentication/demoauth";
//msx learn dev=  http://136.140.193.16:10002/API/Authentication/Authenticate //
//let baseUrl = "http://136.140.193.16:10002/API/Authentication/";

export let cfg = {
  // baseUrl: "http://136.140.193.16:10003",      // EXTERNAL IP
  // apiUrl: "http://136.140.193.16:10003/API/",  // INTERNAL IP
  baseUrl: "http://198.180.251.216:10003",
  apiUrl: "http://198.180.251.216:10003/API/", 
  tokenName: "token",
  agenda: {
    getClassesByDate: "Class/GetClassesByDate",
    getClassesByTraining: "Class/GetClassesByTraining"
  },
  event_summary: {
    getEventSummary: "Class/GetEventSummary"
  },
  user: {
    register: "",
    login: "Authentication/Authenticate",
    refresh: "Authentication/RefreshToken",
    changePassword: "Authentication/ChangePassword",
    recoveryPassowrd: "Authentication/RecoverPassword"
  },
  user_profile: {
    updateUserAvatar: "User/UpdateUserAvatar",
    getUserProfile: "User/GetUserProfile",
    updateUserProfile: "User/UpdateUserProfile"
  },
  notification: {
    all: "notification/GetNotifications",
    notifyRead: "notification/ReadNotification"
  },
  curriculum: {
    all: "curriculum/GetCurriculumSummary",
    getByJobRole: "curriculum/GetCurriculum"
  },
  library: {
    all: "Library/GetLibraries"
  },
  media: {
    all: "Media/GetMedias"
  }
};

export enum APIPermission {
  CURRICULUM,
  DASHBOARD,
  DIARY,
  GPS,
  LIBRARY,
  MEDIA,
  NOTIFICATION,
  PROFILE,
  CHANGE_PASSWORD,
  QR_CODE
}

export enum APIStatus {
  SUCCESS,
  FAILURE,
  BLOCKED_USER,
  DELETED_USER,
  EXPIRED_TOKEN,
  INACTIVE_USER,
  INVALID_CURRENT_PASSWORD,
  INVALID_NEW_PASSWORD,
  INVALID_TOKEN,
  NOT_PERMITTED,
  PASSWORD_NOT_MATCH,
  USER_NOT_FOUND,
  USER_PASSWORD_NOT_MATCH
}

export let fileMimeTypes = [
  { name : "PDF",  type: "application/pdf" }, 
  { name : "DOC",  type: "application/msword"},
  { name : "DOCX", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
  { name : "XLS",  type: "application/vnd.ms-excel" },
  { name : "XLSX", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { name : "PPT",  type: "application/vnd.ms-powerpoint"},
  { name : "PPTX", type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
  { name : "MP4A", type: "audio/mp4"},
  { name : "MP4",  type: "application/mp4"},
  { name : "AVI",  type: "video/x-msvideo"},
  { name : "PNG",  type: "image/png"},
  { name : "JPG",  type: "image/jpeg"},
  { name : "JPEG", type: "image/jpeg"}
];

export let cultures = ["pt-BR", "en-US", "es"];

export function hasFoundAPIStatus(errorMessage) {
  for (const status in APIStatus) {
    if (errorMessage === status) {
      return true;
    }
  }
  return false;
}
