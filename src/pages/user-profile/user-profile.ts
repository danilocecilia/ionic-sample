import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  language: string;
  languages = [
    { name: "English", code: "en" },
    { name: "Portuguese", code: "pt" },
    { name: "French", code: "fr" }
  ];
  countries = ["Brazil", "USA", "France"];
  user = {
    name: "Angelo Martins",
    imageUrl:
      "https://ionicframework.com/dist/preview-app/www/assets/img/marty-avatar.png"
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private translate: TranslateService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserProfilePage");
  }

  onClickSave() {
    debugger;
    this.storage.set("currentLanguage", this.language);
    this.translate.use(this.language);
  }
}
