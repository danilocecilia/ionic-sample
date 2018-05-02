import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EsEnrollmentsComponent } from "../es-enrollments/es-enrollments";
import { EsGradesComponent } from "../es-grades/es-grades";
import { EsBillingsComponent } from "../es-billings/es-billings";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { EsLogisticsComponent } from "../es-logistics/es-logistics";
import { EventSummaryProvider } from "../../providers/event-summary/event-summary";
import { LoadingProvider } from "../../providers/loading/loading";
import { ToastProvider } from "../../providers/toast/toast";
import { TranslateProvider } from "../../providers/translate/translate";
import { DownloadProvider } from "../../providers/download/download";

@Component({
  selector: "event-summary",
  templateUrl: "event-summary.html"
})
export class EventSummaryComponent {
  event: any;
  eventSummary: any;
  open : string;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private eventSummaryProvider : EventSummaryProvider,
    private loadingProvider: LoadingProvider,
    private translateProvider: TranslateProvider,
    private toastProvider: ToastProvider,
    private downloadProvider: DownloadProvider) {
      this.event = this.navParams.get("event");
      
      this.loadEventSummary();
      this.getTranslatedOpenButton();
  }

  loadEventSummary(){
    this.loadingProvider.presentLoadingDefault();

    this.eventSummaryProvider.getEventSummary(7)
    .then((response) => {
      this.loadingProvider.dismissLoading();
      this.eventSummary = response;
      console.log(this.eventSummary);
    });
  }

  downloadFile(fileName, extension){
    this.loadingProvider.presentLoadingDefault();

    this.downloadProvider.initializeFileObject("/Temp/", fileName, extension);

    let checkIfFileIsOnDevice = false;

    this.downloadProvider
      .openOrDownloadFile(checkIfFileIsOnDevice)
      .then(status => {
        this.loadingProvider.dismissLoading();

        if (status === "downloaded") {
          this.showSuccessToast(fileName);
        }
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();

        this.translateProvider
          .translateMessage("ErrorMessage")
          .then(translated => {
            this.toastProvider.presentToast(translated);
          });
      });
  }

  showSuccessToast(sourceFileName) {
    this.translateProvider
      .translateMessageWithParam("LibrarySuccess", sourceFileName)
      .then(translated => {
        this.toastProvider
          .presentToastWithCallBack(translated, this.open)
          .then(() => {
            this.downloadProvider.openDocument();
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  getTranslatedOpenButton(){
    this.translateProvider.translateMessage("Open")
    .then((translated) => {
      this.open = translated;
    })
  }

  onClickGrades() {
    this.navCtrl.push(EsGradesComponent, { event: this.event });
  }

  onClickEnrollment() {
    this.navCtrl.push(EsEnrollmentsComponent, { event: this.event });
  }

  onClickLogistics() {
    this.navCtrl.push(EsLogisticsComponent, { event: this.event });
  }

  onClickBilling() {
    this.navCtrl.push(EsBillingsComponent, { event: this.event });
  }
}
