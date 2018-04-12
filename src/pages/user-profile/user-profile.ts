import { Component, OnInit } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";
import { UserProfileProvider } from "../../providers/user-profile/user-profile";
import { LoadingProvider } from "../../providers/loading/loading";
import { TranslateService } from "@ngx-translate/core";

export interface Language {
  name: string;
  code: string;
  id: number;
}

export interface Country {
  name: string;
}

@IonicPage()
@Component({
  selector: "page-user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage implements OnInit {
  currentLanguage: Language = { name: '', code: '', id: 2 };
  currentCountry: Country = { name: "BRAZIL" };
  loggedUser: any;
  userProfile: any;

  optionCountries: Country[] = [
    { name: "BRAZIL" },
    { name: "USA" },
    { name: "SPAIN" }
  ];

  optionLanguages: Language[] = [
    { name: "English USA", code: "en", id: 1 },
    { name: "Portuguese", code: "pt", id: 2 },
    { name: "Spanish", code: "es", id: 3 },
    { name: "Italian", code: "it-IT", id: 4 },
    { name: "German", code: "de-DE", id: 5 },
    { name: "Japanese", code: "ja-JP", id: 6 },
    { name: "Dutch", code: "nl-NL", id: 7 },
    { name: "French", code: "fr-FR", id: 8 },
    { name: "Swedish", code: "sv-SE", id: 9 },
    { name: "Thai", code: "th-TH", id: 10 },
    { name: "English UK", code: "en-GB", id: 11 },
    { name: "Polish", code: "pl-PL", id: 12 },
    { name: "Chinese", code: "zh-TW", id: 13 }
  ];

  placeholder = "assets/img/thumbnail.png";

  constructor(
    private authProvider: AuthProvider,
    private camera: Camera,
    private toastProvider: ToastProvider,
    private translateProvider: TranslateProvider,
    private userProfileProvider: UserProfileProvider,
    private translate: TranslateService,
    private loaderProvider: LoadingProvider
  ) { }

  ngOnInit() {
    this.loggedUser = this.authProvider.loggedUser;
    this.loadUserProfile();
  }

  updateProfileImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.loaderProvider.presentLoadingDefault();

      this.userProfileProvider
        .updateUserAvatar(imageData)
        .then(response => {
          this.loaderProvider.dismissLoading();

          if (response.status) {
            return "ErrorMessage";
          } else {
            this.loggedUser.Thumbnail = response;
            this.authProvider.saveToLocalStorage(this.loggedUser);
            return "SuccessAvatarMsg";
          }
        })
        .then(response => {
          this.translateProvider.translateMessage(response).then(translated => {
            this.toastProvider.presentToast(translated);
          });
        });
    });
  }

  loadUserProfile() {
    this.userProfileProvider.getUserProfile().then(response => {
      if (response.status) {
        return "ErrorMessage";
      } else {
        this.userProfile = response;

        this.currentCountry.name = this.userProfile.Address.Country;

        this.currentLanguage = this.getLanguageById(this.userProfile.Language.ID);
      }
    });
  }

  private getLanguageById(id: number) {
    return this.optionLanguages.find(lang => lang.id === id);
  }

  onClickSave() {
    this.updateUserProfileObject();

    this.userProfileProvider
      .updateUserProfile(this.userProfile)
      .then(response => {
        if (response.status) {
          return "ErrorMessage";
        } else {

          this.updateLoggedUserObject();

          this.authProvider.saveToLocalStorage(this.loggedUser);

          let culture = this.currentLanguage.code.substring(0, 2);
          this.translate.setDefaultLang(culture);
          this.translate.use(culture);

          return "SuccessProfileMsg";
        }
      })
      .then(response => {
        this.translateProvider.translateMessage(response).then(translated => {
          this.toastProvider.presentToast(translated);
        });
      });
  }

  private updateUserProfileObject() {
    this.userProfile.Address.Country = this.currentCountry.name;
    this.userProfile.Language = this.getLanguageById(this.currentLanguage.id);
    this.userProfile.Token = this.loggedUser.Token;
  }

  private updateLoggedUserObject() {
    this.loggedUser.Address = this.userProfile.Address;
    this.loggedUser.Language = this.userProfile.Language;
    this.loggedUser.FirstName = this.userProfile.FirstName;
    this.loggedUser.LastName = this.userProfile.LastName;
  }
}
