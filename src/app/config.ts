//apiUrlDev = "http://136.140.193.16:10005/jwt/api/authentication/demoauth";
//apiUrlProd = "http://198.180.251.216:10005/jwt/api/authentication/demoauth";
//msx learn dev=  http://136.140.193.16:10002/API/Authentication/Authenticate //
//let baseUrl = "http://136.140.193.16:10002/API/Authentication/";

export let cfg = {
  // baseUrl: "http://136.140.193.16:10003", // EXTERNAL IP
  // apiUrl: "http://136.140.193.16:10003/API/", // INTERNAL IP
  // baseUrl: "http://198.180.251.216:10003",
  // apiUrl: "http://198.180.251.216:10003/API/",
    // baseUrl: "http://test.treinamentoford.com.br",
  // apiUrl:  "http://test.treinamentoford.com.br/API/",
  baseUrl: "http://test.fordu.com.br",
  apiUrl:  "http://test.fordu.com.br/API/",
  tokenName: "token",
  agenda: {
    getClassesByDate: "Class/GetClassesByDate",
    getClassesByTraining: "Class/GetClassesByTraining"
  },
  assessment: {
    get: "Assessment/GetAssessment",
    add: "Assessment/Add"
  },
  event_summary: {
    getEventSummary: "Class/GetEventSummary",
    putActionStep: "Class/ActionStep",
    putActionStatus: "Class/ActionStatus",
    getClass: "Class/GetClass"
  },
  history: {
    enrollmentsByClass: "History/GetEnrollmentsByClass",
    removeEnrollment: "History/RemoveEnrollment",
    updateGrade: "History/UpdateGrade",
    enrollUser: "History/AddEnrollment",
    addForWebBased: "History/AddEnrollmentInWebTraining"
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
    updateUserProfile: "User/UpdateUserProfile",
    allUsers: "User/GetUsersByClass",
    updateDeviceToken: 'User/UpdateDeviceToken'
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
  },
  logistic: {
    getTypes: "Logistic/GetLogisticType",
    logistics: "Logistic/GetLogisticItemXClassByClass",
    getItemsByType: "Logistic/GetLogisticItemByType",
    postFile: "Logistic/PostFileLogistict",
    remove: "Logistic/DeleteLogistic",
    getFiles: "Logistic/GetFilesByLogistic",
    removeFile: "Logistic/DeleteFileLogisticItem",
    update: "Logistic/UpdateLogistic",
    add: "Logistic/AddLogistic"
  },
  billing: {
    getBills: "Billing/GetBillsByClass",
    add: "Billing/AddBilling"
  },
  dashboard: {
    load: "Dashboard/GetDashboard"
  },
  trainingSteps: {
    load: "TrainingProgress/GetTrainingProgress"
  }
};

export enum HistoryStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED,
  CANCELLED
}

export enum TrainingSteps {
  PRE_TEST,
  TRAINING,
  POST_TEST
}

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

export enum GradeScale {
  GRADE_0_10,
  GRADE_0_100
}

export enum APIMonetarySymbol {
  NONE, // None
  USD, // UNited Stated Dollar
  EUR, // Euro
  BRL, // Brazilian Real
  JPY, // Japanese Yen
  TWD // Taiwan Dollar
}

export enum StepType {
  PRE_TEST = 0,
  POST_TEST = 1,
  TRAINING = 2,
  SATISFACTION = 3
}

export let fileMimeTypes = [
  { name: "PDF", type: "application/pdf" },
  { name: "DOC", type: "application/msword" },
  {
    name: "DOCX",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  { name: "XLS", type: "application/vnd.ms-excel" },
  {
    name: "XLSX",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  { name: "PPT", type: "application/vnd.ms-powerpoint" },
  {
    name: "PPTX",
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  },
  { name: "MP4A", type: "audio/mp4" },
  { name: "MP4",  type: "application/mp4" },
  { name: "AVI",  type: "video/x-msvideo" },
  { name: "PNG",  type: "image/png" },
  { name: "JPG",  type: "image/jpeg" },
  { name: "JPEG", type: "image/jpeg" }
];

export const APP_NAME = "MSX LEARN"; 

export let CULTURES = { english: "en" , portuguese : "pt" , spanish : "es" };

export const COLORS = { darkblue : "#003a8b" };

export const CURRENT_USER = "currentUser";

export const DEVICE = { ios : "ios", android : "android", windows: "windows"};

export const ONE_MINUTE = 60000;

export const FILE_STATUS = {downloaded : "downloaded", opened : "opened"};

export const SENDER_ID = "691007744829";

export function hasFoundAPIStatus(errorMessage) {
  for (const status in APIStatus) {
    if (errorMessage === status) {
      return true;
    }
  }
  return false;
}
