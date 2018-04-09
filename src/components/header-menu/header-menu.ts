import { Component, ViewChild, OnInit } from "@angular/core";
import { App, Nav, MenuController, Events } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "header-menu",
  templateUrl: "header-menu.html"
})
export class HeaderMenuComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;
  currentUser: any;

  pages: Array<{ title: string; component: any; method?: any; icon?: any }>;

  constructor(
    private authProvider: AuthProvider,
    private app: App,
    private menuCtrl: MenuController,
    private events: Events,
    private camera: Camera
  ) {
    this.pages = [
      {
        title: "MenuProfile.Profile",
        component: "UserProfilePage",
        icon: "md-person"
      },
      {
        title: "MenuProfile.ChangePassword",
        component: "ChangePasswordPage",
        icon: "md-lock"
      },
      {
        title: "MenuProfile.Logoff",
        component: "AuthPage",
        method: "logout",
        icon: "md-log-out"
      }
    ];

    this.events.subscribe("currentUser", user => {
      if (user) this.currentUser = user.currentUser;
    });
  }

  ngOnInit() {

    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authProvider.getLoggedUser().then(res => {
      if (res) {
        this.currentUser = res;
        //console.log("getCurrentUser: " + this.currentUser);
      }
    });
  }

 getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.currentUser.Thumbnail = imageData;
        console.log('imageData '+imageData);
      },
      err => {
        console.log(err);
        //this.presentToast(err);
      }
    );
  }


  updateProfileImage() {
    this.getImage();
    // this.camera.getPicture({
    //   quality: 50,
    //   allowEdit: true,
    //   cameraDirection: this.camera.Direction.FRONT,
    //   destinationType: this.camera.DestinationType.DATA_URL
    // }).then((imageData) => {
    //   this.currentUser.Thumbnail = imageData;
    // }, (err) => {

    //   //this.toastCtrl.create('Error: ' + err);
    // });
  }

  openPage(page) {
    this.menuCtrl.close();
    if (page.method && page.method === "logout") {
      this.authProvider.logout();
    } else {
      var nav = this.app.getRootNav();
      nav.push(page.component);
    }
  }
}
