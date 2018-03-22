import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthPage } from "../auth/auth";

export class ProtectedPage {
  currentUser:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {}

  ionViewDidLoad() {}

  ionViewCanEnter() {
    this.storage.get("currentUser").then(user => {
      if (!user) {
        this.navCtrl.setRoot("AuthPage");
        return false;
      }
      else this.currentUser = user;
    });

    return true;
  }
}
