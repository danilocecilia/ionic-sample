import { Component, ViewChild, OnInit } from "@angular/core";
import { App, Nav, MenuController, Events } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { UserStore } from "../../stores/user.store";

@Component({
  selector: "header-menu",
  templateUrl: "header-menu.html"
})
export class HeaderMenuComponent {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string; component: any; method?: any; icon?: any }>;

  constructor(
    private app: App,
    private menuCtrl: MenuController,
    private events: Events,
    private userStore: UserStore,
    private authProvider: AuthProvider
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
