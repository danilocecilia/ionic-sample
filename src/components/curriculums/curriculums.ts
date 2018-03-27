import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NavController, Events, NavParams, Slides } from "ionic-angular";
import { CompetencyProvider } from "../../providers/competency/competency";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { AgendaPage } from "../../pages/agenda/agenda";
import { CourseStepsComponent } from "../course-steps/course-steps";
import { LoadingProvider } from "../../providers/loading/loading";
import * as AppConfig from "../../app/config";
import { TranslateService } from "@ngx-translate/core";
import { TranslateProvider } from "../../providers/translate/translate";
import { ToastProvider } from "../../providers/toast/toast";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: "curriculums",
  templateUrl: "curriculums.html"
})
export class CurriculumsComponent implements OnInit {
  @ViewChild(Slides) slides: Slides;

  competency: any = {};
  history: any;
  idCompetency: number;
  text: string;
  isEnrollmentHidden: boolean = true;
  training: any;

  @Input("progress") progress;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    private competencyProvider: CompetencyProvider,
    private modalController: ModalController,
    public navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private translate: TranslateService,
    private translateProvider: TranslateProvider,
    private toastProvider: ToastProvider,
    private authProvider: AuthProvider
  ) {
    this.idCompetency = navParams.get("idCompetency");
  }

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.getCompetency();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();

    if (this.competency.Competency[currentIndex]) {
      this.history = this.competency.Competency[currentIndex].History;
      this.progress = this.competency.Competency[currentIndex].Percentage;
    }
  }

  getCompetency() {
    this.competencyProvider
      .getCompetency(this.idCompetency)
      .then(comp => {
        this.competency = comp;

        this.history = this.competency.Competency[0].History;
        this.progress = this.competency.Competency[0].Percentage;
        this.loadingProvider.dismissLoading();
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();

        if (AppConfig.hasFoundAPIStatus(err.error)) {
          if (AppConfig.APIStatus[err.error] === "INVALID_TOKEN") {
            this.translateProvider
              .translateMessage("ApiStatus." + err.error)
              .then(text => {
                this.authProvider.logout(text);
              });
          }
        } else this.toastProvider.presentToast(err.error.Message);
      });
  }

  openCalendar(status, training_id) {
    if (status == "PASS" || status == "ENROLLED")
      return this.onClickStartCourse();

    let calendarModal = this.modalController.create(AgendaPage, {
      id: training_id
    });
    calendarModal.present();
  }

  onClickStartCourse() {
    this.navCtrl.push(CourseStepsComponent, {});
  }

  onClick(training, status) {
    if (status == "NOT_STARTED") {
      this.isEnrollmentHidden = false;
      this.training = training;
    } else if (status == "PASS" || status == "ENROLLED") {
      this.onClickStartCourse();
    }
  }
}
