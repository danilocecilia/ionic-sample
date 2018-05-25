import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { UserStore  } from "../../stores/user.store";

@Injectable()
export class CurriculumProvider {
  private cfg: any;

  constructor(private http: HttpClient, private userStore: UserStore) {}

  loadCurriculum() {
    return this.http.get(`${AppConfig.cfg.apiUrl + AppConfig.cfg.curriculum.all}?token=${this.userStore.user.Token}`).toPromise();
  }
}
