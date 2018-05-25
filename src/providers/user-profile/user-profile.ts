import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as AppConfig from "../../app/config";
import { UserStore } from "../../stores/user.store";

@Injectable()
export class UserProfileProvider {
  constructor(public http: HttpClient, private userStore: UserStore) {}

  updateUserAvatar(userThumbnail: string) {
    let apiUser = {
      Token: this.userStore.user.Token,
      Thumbnail: userThumbnail
    };

    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.user_profile.updateUserAvatar}`,apiUser)
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  getUserProfile() {
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.user_profile.getUserProfile}?token=${this.userStore.user.Token}`)
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  updateUserProfile(userProfile){
    return this.http.post(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.user_profile.updateUserProfile}`,userProfile)
    .toPromise()
    .catch(err => {
      return err;
    });
  }

  loadUsersByClass(idClass, page){
    return this.http.get(`${AppConfig.cfg.apiUrl}${AppConfig.cfg.user_profile.allUsers}?token=${this.userStore.user.Token}&idClass=${idClass}&page=${page}&results=`).toPromise();
  }
}
