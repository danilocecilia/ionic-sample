import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NavController, Events, NavParams, Slides } from "ionic-angular";
import { CompetencyProvider } from "../../providers/competency/competency";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { AgendaPage } from "../../pages/agenda/agenda";
import { CourseStepsComponent } from "../course-steps/course-steps";
import { LoadingProvider } from "../../providers/loading/loading";
import { AuthProvider } from "../../providers/auth/auth";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";
import { CompetencyStore } from "../../stores/competency.store";

@Component({
  selector: "curriculums",
  templateUrl: "curriculums.html"
})
export class CurriculumsComponent implements OnInit {
  @ViewChild(Slides) slides: Slides;

  selectedHistory: any;
  idCompetency: number;
  hasAlreadyEnrolled: boolean = true;
  selectedTraining: any;

  @Input("progress") progress;
  constructor(
    private navCtrl: NavController,
    private events: Events,
    private competencyProvider: CompetencyProvider,
    private modalController: ModalController,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private authProvider: AuthProvider,
    private enrollmentProvider: EnrollmentProvider,
    private competencyStore: CompetencyStore
  ) {
    this.idCompetency = navParams.get("idCompetency");
  }

  ngOnInit() {
    this.getCompetency();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.competencyStore.slideChanged(currentIndex);
  }

  getCompetency() {
    this.loadingProvider.presentLoadingDefault();
    this.competencyProvider.getCompetency(this.idCompetency).then(() => {
      this.loadingProvider.dismissLoading();
    });
  }

  openCalendar(courseStatus, idTraining) {
    if (courseStatus == "PASS" || courseStatus == "ENROLLED")
      return this.onClickStartCourse(idTraining, null);

    let calendarModal = this.modalController.create(AgendaPage, {
      id: idTraining
    });
    calendarModal.present();
  }

  onClickStartCourse(training, status) {
    let history = {
      ID_Class: 0,
      ID_User: this.authProvider.loggedUser.ID,
      ID_Training: training.ID
    };

    if (!status) {
      this.loadingProvider.presentLoadingDefault();
      this.enrollmentProvider
        .enrollForWebBasedTraining(history)
        .then(response => {
          this.loadingProvider.dismissLoading();
          this.getCompetency();
          this.hasAlreadyEnrolled = true;
          this.navCtrl.push(CourseStepsComponent, {idTraining: training.ID,trainingName: training.Training, idCompetency: this.idCompetency});
        })
        .catch(err => console.log(err));
    }
    else{
      this.navCtrl.push(CourseStepsComponent, {idTraining: training.ID,trainingName: training.Training, idCompetency: this.idCompetency});
    }
  }

  onClick(history, training, courseStaus) {
    if (courseStaus == "NOT_STARTED") {
      this.loadingProvider.presentLoadingDefault();
      setTimeout(() => {
        this.hasAlreadyEnrolled = false;
        this.selectedTraining = training;
        this.selectedHistory = history;
        this.loadingProvider.dismissLoading();
      }, 1400);
    } else if (
      courseStaus === "PASS" ||
      courseStaus === "ENROLLED" ||
      courseStaus === "IN_PROGRESS"
    ) {
      this.onClickStartCourse(training,courseStaus);
    }
  }
}
