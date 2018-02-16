import { Component, ViewChild } from '@angular/core';
import { App, Nav, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {
  @ViewChild(Nav) nav : Nav; 
  text: string;
  pages: Array<{ title: string, component: any, method?: any, icon?: any }>;

  constructor(public authProvider: AuthProvider,  public app: App, public menuCtrl: MenuController) {

    this.pages = [
      { title: 'Profile', component: 'UserProfilePage', icon: 'md-person' },
      { title: 'Change Password', component: 'ChangePasswordPage', icon: 'md-lock' },
      { title: 'Set as Home Page', component: 'Home', method: "setHomePage", icon: 'md-bookmark' },
      { title: 'Logout', component: 'AuthPage', method: 'logout', icon: 'md-log-out' }
    ];
  }

  openPage(page) {
    if (page.method && page.method === 'logout') {
      this.authProvider.logout();
    }

    this.menuCtrl.close();

    var nav = this.app.getRootNav();
    nav.push(page.component);
  }
}
