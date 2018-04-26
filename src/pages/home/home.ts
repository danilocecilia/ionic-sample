import { Component, OnInit } from "@angular/core";
import {
  NavController,
  AlertController,
  MenuController,
  Events,
  ModalController,
  Refresher
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { NavParams } from "ionic-angular/navigation/nav-params";

import { ProtectedPage } from "../protected/protected";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { AuthProvider } from "../../providers/auth/auth";
import { Toast } from "@ionic-native/toast";
import { DashboardComponent } from "../../components/dashboard/dashboard";
import * as APPConfig from "../../app/config";
import { LoadingProvider } from "../../providers/loading/loading";
import { NotificationProvider } from "../../providers/notification/notification";
import { ModalNotificationPage } from "../modal-notification/modal-notification";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends ProtectedPage implements OnInit {
  //username: string;
  todos: any;
  isButtonsHidden: boolean = true;
  notifications: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public events: Events,
    public modalCtrl: ModalController,
    public menu: MenuController,
    
    private barcodeScanner: BarcodeScanner,
    private authProvider: AuthProvider,
    private toast: Toast,
    private notificationProvider: NotificationProvider,
    private loadingProvider: LoadingProvider,

  ) {
    super(navCtrl, navParams, storage);

    this.menu.enable(true);
    this.navCtrl = navCtrl;
  }

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadNotifications(null);
  }


  ionViewWillEnter() {
    this.events.publish("hideHeader", { isHidden: false });
  }

  ionViewDidLoad() {}

  viewDidLeave() {
    this.events.publish("hideHeader", { isHidden: true });
  }

  userHasPermission() {
    let user = this.authProvider.loggedUser;

    if (user.Permissions) {
      user.Permissions.find(element => {
        let permission = APPConfig.APIPermission[element];

        if (permission === "GPS" || permission === "DASHBOARD") {
          this.isButtonsHidden = false;
        }
      });
    }
  }

  doRefresh(refresher?: Refresher) {
    //console.log("DOREFRESH", refresher);
    this.loadNotifications(refresher);
  }

  doPulling(refresher: Refresher) {
    console.log("DOPULLING", refresher.progress);
  }

  loadNotifications(refresher: Refresher) {
    this.notificationProvider
      .loadNotifications()
      .then(res => {
        this.loadingProvider.dismissLoading();
        this.notifications = this.notificationProvider.notification = res;
        this.events.publish("updateBadge", this.notifications.QtyUnread);
        refresher.complete();
      })
      .catch(err => {
        if (APPConfig.hasFoundAPIStatus(err.error))
          this.authProvider.logout(err.error);

        // this.toastProvider.presentToast("Erro ao carregar as notificações.");
        //this.loadingProvider.dismissLoading();
      });
  }

  openNotification(notificationItem) {
    this.notificationProvider
      .setNotificationRead(notificationItem.ID)
      .then(() => {
        this.openModal(notificationItem);
      })
      .catch(error => {
        console.log("Error when updating read notification: " + error);
      });
  }

  openModal(notificationItem) {
    let modal = this.modalCtrl.create(ModalNotificationPage, {
      notification: notificationItem
    });

    modal.onDidDismiss(() => {
      this.loadNotifications(null);
    })

    modal.present();
  }

}
