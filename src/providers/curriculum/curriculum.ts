import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class CurriculumProvider {
  private cfg: any;

  constructor(public http: HttpClient, private auth: AuthProvider) {
    this.cfg = AppConfig.cfg;
  }

  loadCurriculum() {
    return this.auth.getToken().then((token) => {
      return this.http
        .get(`${this.cfg.apiUrl + this.cfg.curriculum.all}?token=${token}`)
        .toPromise();
    });
  }
}
