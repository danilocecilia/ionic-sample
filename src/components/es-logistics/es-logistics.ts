import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ModalLogisticPage } from "../../pages/modal-logistic/modal-logistic";
import { LogisticProvider } from "../../providers/logistic/logistic";
import { AuthProvider } from "../../providers/auth/auth";
import { ToastProvider } from "../../providers/toast/toast";
import { LoadingProvider } from "../../providers/loading/loading";

@Component({
  selector: "es-logistics",
  templateUrl: "es-logistics.html"
})
export class EsLogisticsComponent implements OnInit {
  loggedUser: any;
  idClass: number;
  classCode: string;
  logistics: any;
  currentCulture: string;

  constructor(
    private navCtrl: NavController,
    private navParam: NavParams,
    private logisticProvider: LogisticProvider,
    private authProvider: AuthProvider,
    private toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider
  ) {
    this.idClass = this.navParam.get("idClass");
    this.classCode = this.navParam.get("classCode");
  }

  addLogistic(){
    this.navCtrl.push(ModalLogisticPage, { class: this.logistics.ClassAPI });
  }

  ngOnInit() {
    this.loggedUser = this.authProvider.loggedUser;
    this.currentCulture = this.loggedUser.Language.Culture;
  }

  onClickOpenModalLogistics(item) {
    this.navCtrl.push(ModalLogisticPage, {
      logistic: item,
      class: this.logistics.ClassAPI
    });
  }

  remove(item) {
    this.logisticProvider
      .removeLogistic(item.ID)
      .then(response => {
        if(response === "SUCCESS"){
          this.logistics.LogisticItemsXClass = this.logistics.LogisticItemsXClass.filter(logistic => logistic.ID !== item.ID);
          this.toastProvider.presentTranslatedToast("SuccessRemovalLogistic");
        }
      })
      .catch(err => {
        this.toastProvider.presentTranslatedToast("ErrorMessage");
        console.log(err);
      });
  }

  ionViewDidEnter() {
    this.loadingProvider.presentLoadingDefault();
    this.logisticProvider
      .getLogisticsByClass(this.idClass)
      .then(response => {
        this.loadingProvider.dismissLoading();
        this.logistics = response;
        console.log(this.logistics);
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        console.log(err);
      });
  }
}
