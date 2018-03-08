import { Component, ViewChild, OnInit } from "@angular/core";
import { App, Nav, MenuController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { TranslateService } from "@ngx-translate/core";
/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "header-menu",
  templateUrl: "header-menu.html"
})
export class HeaderMenuComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;
  titlePage: string;
  pages: Array<{ title: string; component: any; method?: any; icon?: any }>;

  constructor(
    public authProvider: AuthProvider,
    public app: App,
    public menuCtrl: MenuController,
    private translate: TranslateService
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

  ngOnInit() {
   
  }

  openPage(page) {
    if (page.method && page.method === "logout") {
      this.authProvider.logout();
    }

    this.menuCtrl.close();

    var nav = this.app.getRootNav();
    nav.push(page.component);
  }
}
