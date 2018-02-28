
//apiUrlDev = "http://136.140.193.16:10005/jwt/api/authentication/demoauth";
//apiUrlProd = "http://198.180.251.216:10005/jwt/api/authentication/demoauth";

export let cfg = {
  apiUrl: 'http://198.180.251.216:10005/jwt/api/authentication/demoauth',
  tokenName: 'token',
  user: {
    register: '/auth/signup',
    login: '/demoauth',
    refresh: '/refresh',
  },
  books: '/books'
};
