import { NavController } from "ionic-angular";
import { UserStore } from "../../stores/user.store";

export class ProtectedPage {
  constructor(
    public navCtrl: NavController,
    public userStore: UserStore
  )
  {}

  ionViewCanEnter() {
    if (this.userStore.user) {
      return true;
    } else {
      this.navCtrl.setRoot("AuthPage");
      return false;
    }
  }
}
