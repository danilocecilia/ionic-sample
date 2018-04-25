import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  MenuController,
  Events,
  ModalController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { NavParams } from "ionic-angular/navigation/nav-params";

import { ProtectedPage } from "../protected/protected";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends ProtectedPage {
  //username: string;
  todos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public events: Events,
    public modalCtrl: ModalController,
    public menu: MenuController,
  ) {
    super(navCtrl, navParams, storage);

    this.menu.enable(true);
    this.navCtrl = navCtrl;
  }

  ionViewWillEnter() {
    this.events.publish("hideHeader", { isHidden: false });
  }

  ionViewDidLoad() {}

  viewDidLeave() {
    this.events.publish("hideHeader", { isHidden: true });
  }
}
