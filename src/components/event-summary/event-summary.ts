import { Component, OnInit } from "@angular/core";
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
import { EnrollmentProvider  } from "../../providers/enrollment/enrollment";
@Component({
  selector: "event-summary",
  templateUrl: "event-summary.html"
})
export class EventSummaryComponent implements OnInit{
  currentClass: any;
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
    private downloadProvider: DownloadProvider, 
    private enrollmentProvider: EnrollmentProvider) {
      this.currentClass = this.navParams.get("event");
  }

  ngOnInit(){
    this.loadEventSummary();
    this.getTranslatedOpenButton();
  }

  loadEventSummary(){
    this.loadingProvider.presentLoadingDefault();
    this.eventSummaryProvider.getEventSummaryByClass(this.currentClass.ID)
    .then((response) => {
      this.loadingProvider.dismissLoading();
      this.eventSummary = response;
      console.log(this.eventSummary);
    });
  }

  onChangeStatus(actionType){
    this.action = {
      IdClass: this.currentClass.ID,
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
      IdClass: this.currentClass.ID,
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
    this.loadingProvider.presentLoadingDefault();

    this.enrollmentProvider.loadEnrollmentsByClass(this.currentClass.ID)
    .then(response => {
      this.loadingProvider.dismissLoading();
      this.navCtrl.push(EsGradesComponent, { enrollments: response });  
    }).catch(err => {
      this.loadingProvider.dismissLoading();
      this.toastProvider.presentTranslatedToast("ErrorMessage");
      console.log(err)
    });
  }

  onClickEnrollment() {
    this.navCtrl.push(EsEnrollmentsComponent, { idClass : this.currentClass.ID });  
  }

  onClickLogistics() {
    this.navCtrl.push(EsLogisticsComponent, { idClass : this.currentClass.ID, classCode : this.currentClass.ClassCode });
  }

  onClickBilling() {
    this.navCtrl.push(EsBillingsComponent, { event: this.currentClass });
  }
  
  ionViewDidEnter(){
    this.eventSummaryProvider.getClassById(this.currentClass.ID)
    .then(cClass => {
      this.currentClass = cClass;
    }).catch(err => {
      console.log(err);
    });    
  }
}
