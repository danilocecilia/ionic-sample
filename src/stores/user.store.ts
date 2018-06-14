import { observable, action } from 'mobx-angular';
import { Injectable } from "@angular/core";
import * as mobx from 'mobx';
import * as AppConfig from "../app/config";
import { Storage } from "@ionic/storage";
import { User } from "../model/user";

@Injectable()
export class UserStore {
  @observable user: User;

  constructor(private storage: Storage) {}

  initialize(){
    return new Promise((resolve, reject) => {
      this.storage.ready()
      .then(() => this.storage.get(AppConfig.CURRENT_USER))
      .then(data => {
        if(data){
          this.setUser(JSON.parse(data));
        } else {
          this.setUser(null);
        }
        mobx.autorun(() => {this.persistUser()});
        resolve();
      })
    })
  }

  persistUser(){
    this.storage.set(AppConfig.CURRENT_USER, JSON.stringify(this.user));
  }

  @action
  setUser(user: User) {
    this.user = user;
    this.persistUser();
  }

  @action
  logout() {
    this.user = null;
  }
}

