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
    // mobx.autorun(() => this.saveUser())
    // this.getUser().then(() => mobx.autorun(() => this.saveUser()));
  }

  initialize(){
    return new Promise((resolve, reject) => {
      this.storage.ready()
      .then(() => this.storage.get(AppConfig.CURRENT_USER))
      .then(data => {
        if(data){
          // const user = JSON.parse(data);
          this.authenticateUser(JSON.parse(data));
        } else {
          this.authenticateUser(null);
        }
        mobx.autorun(() => this.saveUser());
        resolve();
      })
    })
  }

  // getUser(): Promise<User>{
  //   // return new Promise((reject, resolve) => {

  //   // })
  //   return this.storage.ready()
  //   .then(() => this.storage.get(AppConfig.CURRENT_USER))
  //   .then(data => {
  //     const user = JSON.parse(data);

  //     if(user){
  //       this.user = user;
  //       return user;
  //     }

  //     return null;
  //   })
  // }

  // persistUser
  saveUser(){
    this.storage.set(AppConfig.CURRENT_USER, JSON.stringify(this.user));
    // if(this.user)
    //   return this.storage.set(AppConfig.CURRENT_USER, JSON.stringify(this.user));
  }

  // getUserStorage(){
  //   return this.storage.get(AppConfig.CURRENT_USER).then(data => this.user = data);
  // }

  //setUser
  @action
  authenticateUser(user: User) {
    this.user = user;
    this.saveUser();
  }

  @action
  logout() {
    this.user = null;
  }
}

