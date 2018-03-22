//apiUrlDev = "http://136.140.193.16:10005/jwt/api/authentication/demoauth";
//apiUrlProd = "http://198.180.251.216:10005/jwt/api/authentication/demoauth";
//msx learn dev=  http://136.140.193.16:10002/API/Authentication/Authenticate //
//let baseUrl = "http://136.140.193.16:10002/API/Authentication/";

export let cfg = {
  apiUrl: "http://198.180.251.216:10002/API/",
  tokenName: "token",
  agenda:{
    agenda:"Class/GetClassesByDate"
  },
  user: {
    register: "",
    login: "Authentication/Authenticate",
    refresh: "Authentication/RefreshToken"
  },
  notification: {
    all: "notification/GetNotifications"
  },
  curriculum: {
    all: "curriculum/GetCurriculumSummary",
    getByJobRole: "curriculum/GetCurriculum"
  }
};

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

export let cultures = ["pt-BR", "en-US", "es"];

export function hasFoundAPIStatus(errorMessage) {
  for (const status in APIStatus) {
    if (errorMessage === status) {
      return true;
    }
  }
  return false;
}
