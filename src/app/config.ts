//apiUrlDev = "http://136.140.193.16:10005/jwt/api/authentication/demoauth";
//apiUrlProd = "http://198.180.251.216:10005/jwt/api/authentication/demoauth";
//msx learn dev=  http://136.140.193.16:10002/API/Authentication/Authenticate //

export let cfg = {
  apiUrl: "http://136.140.193.16:10002/API/Authentication/Authenticate",
  tokenName: "token",
  user: {
    register: "/auth/signup",
    login: "/demoauth",
    refresh: "/refresh"
  },
  books: "/books",
  //apis: { APIStatus }
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
