import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AuthPage } from "../auth/auth";
/**
 * Generated class for the ProtectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class ProtectedPage {
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
    });

    return true;
  }
}
