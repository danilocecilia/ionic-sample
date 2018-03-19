import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { App, Nav, MenuController, Events } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { Storage } from "@ionic/storage";
@Component({
  selector: "header-menu",
  templateUrl: "header-menu.html"
})
export class HeaderMenuComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;
  currentUser: any;

  pages: Array<{ title: string; component: any; method?: any; icon?: any }>;

  constructor(
    public authProvider: AuthProvider,
    public app: App,
    public menuCtrl: MenuController,
    private storage: Storage,
    public events: Events
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

    events.subscribe("currentUser", user => {
      this.currentUser = user.currentUser;
      console.log(this.currentUser);
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authProvider.getLoggedUser().then(res => {
      this.currentUser = res;
      console.log('getCurrentUser: '+ this.currentUser);
      debugger;
    });
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
