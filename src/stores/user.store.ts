import { observable, action, computed } from 'mobx-angular';
import { Injectable } from "@angular/core";
import * as mobx from 'mobx';
import * as AppConfig from "../app/config";
import { Storage } from "@ionic/storage";
import { User } from "../model/user";

@Injectable()
export class UserStore {
  @observable user: User;

  constructor(private storage: Storage) {
    this.getUser().then(() => mobx.autorun(() => this.saveUser()));
  }

  getUser(): Promise<User>{
    return this.storage.ready()
    .then(() => this.storage.get(AppConfig.CURRENT_USER))
    .then(data => {
      const user = JSON.parse(data);

      if(user){
        this.user = user;
        return user;
      }

      return null;
    })
  }

  saveUser(){
    if(this.user)
      return this.storage.set(AppConfig.CURRENT_USER, JSON.stringify(this.user));
  }

  getUserStorage(){
    return this.storage.get(AppConfig.CURRENT_USER).then(data => this.user = data);
  }

  @action
  authenticateUser(user: User) {
    this.user = user;
  }

  @action
  logout() {
    this.user = null;
  }
}

