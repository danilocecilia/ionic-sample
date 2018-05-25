import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ModalLogisticPage } from "../../pages/modal-logistic/modal-logistic";
import { LogisticProvider } from "../../providers/logistic/logistic";
import { ToastProvider } from "../../providers/toast/toast";
import { LoadingProvider } from "../../providers/loading/loading";
import { LogisticStore } from "../../stores/logistic.store";
import { UserStore } from "../../stores/user.store";

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
    private toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider,
    private logisticStore: LogisticStore,
    private userStore: UserStore
  ) {
    this.idClass = this.navParam.get("idClass");
    this.classCode = this.navParam.get("classCode");
  }

  addLogistic() {
    this.navCtrl.push(ModalLogisticPage, {
      classAPI: { idClass: this.idClass, classCode: this.classCode }
    });
  }

  ngOnInit() {
    this.currentCulture = this.userStore.user.Language.Culture;

    this.logisticProvider.getLogisticsByClass(this.idClass);
  }

  onClickOpenModalLogistics(item) {
    this.navCtrl.push(ModalLogisticPage, {
      logistic: item,
      classAPI: { idClass: this.idClass, classCode: this.classCode }
    });
  }

  remove(idLogistic) {
    this.logisticProvider
      .removeLogistic(idLogistic)
      .then(() => {
        this.toastProvider.presentTranslatedToast("SuccessRemovalLogistic");
      })
      .catch(err => {
        this.toastProvider.presentTranslatedToast("ErrorMessage");
        console.log(err);
      });
  }
}
