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
  Language: string;
  Culture: string;
  ID: number;
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
  currentLanguage: Language = { Language: "", Culture: "", ID: 2 };
  currentCountry: Country = { name: "BRAZIL" };
  loggedUser: any;
  userProfile: any;

  optionCountries: Country[] = [
    { name: "BRAZIL" },
    { name: "USA" },
    { name: "SPAIN" }
  ];

  optionLanguages: Language[] = [
    { Language: "English USA", Culture: "en-US", ID: 1 },
    { Language: "Portuguese", Culture: "pt-BR", ID: 2 },
    { Language: "Spanish", Culture: "es-ES", ID: 3 },
    { Language: "Italian", Culture: "it-IT", ID: 4 },
    { Language: "German", Culture: "de-DE", ID: 5 },
    { Language: "Japanese", Culture: "ja-JP", ID: 6 },
    { Language: "Dutch", Culture: "nl-NL", ID: 7 },
    { Language: "French", Culture: "fr-FR", ID: 8 },
    { Language: "Swedish", Culture: "sv-SE", ID: 9 },
    { Language: "Thai", Culture: "th-TH", ID: 10 },
    { Language: "English UK", Culture: "en-GB", ID: 11 },
    { Language: "Polish", Culture: "pl-PL", ID: 12 },
    { Language: "Chinese", Culture: "zh-TW", ID: 13 }
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
  ) {}

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

        this.currentLanguage = this.getLanguageById(
          this.userProfile.Language.ID
        );
         
        this.currentLanguage = this.getLanguageById(this.userProfile.Language.ID);
      }
    });
  }

  private getLanguageById(id: number) {
    let language = this.optionLanguages.find(lang => lang.ID === id);
    return JSON.parse(JSON.stringify(language));
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

          let culture = this.currentLanguage.Culture.substring(0, 2);
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
    this.userProfile.Language = this.getLanguageById(this.currentLanguage.ID);
    this.userProfile.Token = this.loggedUser.Token;
  }

  private updateLoggedUserObject() {
    this.loggedUser.Address = this.userProfile.Address;
    this.loggedUser.Language = this.userProfile.Language;
    this.loggedUser.FirstName = this.userProfile.FirstName;
    this.loggedUser.LastName = this.userProfile.LastName;
  }
}
