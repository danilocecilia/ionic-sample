import { observable, action, computed, autorun } from "mobx";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import * as AppConfig from "../app/config";

@Injectable()
export class UserStore {
  @observable user: User;

  constructor() {
    if (localStorage.savedTransations) {
      this.user = JSON.parse(localStorage.savedTransations);
    }

    autorun(() => {
      localStorage.savedTransations = JSON.stringify(this.user);
    });
  }

  @action
  authenticateUser(user: User) {
    this.user = user;
  }

  @action logout(){
    localStorage.savedTransations = null;
    this.user = null;
  }
}
