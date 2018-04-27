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
import { DonwloadProvider } from "../../providers/donwload/donwload";
import { EnrollmentProvider  } from "../../providers/enrollment/enrollment";
@Component({
  selector: "event-summary",
  templateUrl: "event-summary.html"
})
export class EventSummaryComponent {
  event: any;
  eventSummary: any;
  open : string;
  action: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private eventSummaryProvider : EventSummaryProvider,
    private loadingProvider: LoadingProvider,
    private translateProvider: TranslateProvider,
    private toastProvider: ToastProvider,
    private donwloadProvider: DonwloadProvider, 
    private enrollmentProvider: EnrollmentProvider) {
      this.event = this.navParams.get("event");
      this.loadEventSummary();
      this.getTranslatedOpenButton();
  }

  loadEventSummary(){
    this.loadingProvider.presentLoadingDefault();

    this.eventSummaryProvider.getEventSummaryByClass(this.event.ID)
    .then((response) => {
      this.loadingProvider.dismissLoading();
      this.eventSummary = response;
      console.log(this.eventSummary);
    });
  }

  onChangeStatus(actionType){
    this.action = {
      IdClass: this.event.ID,
      Status: actionType,
    }

    this.eventSummaryProvider.updateActionStatus(this.action) 
    .then(status => {
      if(status == "SUCCESS"){
        this.toastProvider.presentTranslatedToast("ActionStatusSuccess");
      }
    }).catch(err => {
      this.toastProvider.presentTranslatedToast("ErrorMessage");
    });;
  }

  onChangeStep(actionType){
    this.action = {
      IdClass: this.event.ID,
      Step: actionType,
    }

    this.eventSummaryProvider.updateActionStep(this.action)
    .then(status => {
      if(status == "SUCCESS"){
        this.toastProvider.presentTranslatedToast("ActionStepSuccess");
      }
    }).catch(err => {
      this.toastProvider.presentTranslatedToast("ErrorMessage");
    });
  }

  downloadFile(fileName, extension){
    this.loadingProvider.presentLoadingDefault();

    this.donwloadProvider.initializeFileObject("/Temp/", fileName, extension);

    let checkIfFileIsOnDevice = false;

    this.donwloadProvider
      .openFile(checkIfFileIsOnDevice)
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
            this.donwloadProvider.openDocument();
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
    this.enrollmentProvider.loadEnrollmentsByClass(this.event.ID)
    .then(response => {
      this.navCtrl.push(EsEnrollmentsComponent, { enrollments: response });  
    }).catch(err => {
      this.toastProvider.presentTranslatedToast("ErrorMessage");
      console.log(err)
    });
  }

  onClickLogistics() {
    this.navCtrl.push(EsLogisticsComponent, { event: this.event });
  }

  onClickBilling() {
    this.navCtrl.push(EsBillingsComponent, { event: this.event });
  }
}
