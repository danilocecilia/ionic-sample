import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";
import { AuthProvider } from "../../providers/auth/auth";

export interface Language {
  name: string;
  code: string;
}

@IonicPage()
@Component({
  selector: "page-user-profile",
  templateUrl: "user-profile.html"
})

export class UserProfilePage implements OnInit {
  currentLanguage: Language = { name: "Portuguese", code: "pt-BR" };
  loggedUser:any;
  currentUser: any;

  optionLanguages: Language[] = [
    { name: "English", code: "en-US" },
    { name: "Portuguese", code: "pt-BR" },
    { name: "Spanish", code: "es" }
  ];

  countries = ["Brazil", "USA", "Spanish"];
  placeholder = "assets/img/thumbnail.png";
  stateOptionKeys = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private translate: TranslateService,
    public authProvider: AuthProvider
  ) {}

  ngOnInit() {
    this.loggedUser = this.authProvider.loggedUser
  }

  updateProfileImage() {}

  onClickSave() {
    //this.storage.set("currentLanguage", this.language);
    //this.translate.use(this.language);
  }
}
