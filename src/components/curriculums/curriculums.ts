import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NavController, Events, NavParams, Slides } from "ionic-angular";
import { CurriculumProvider } from "../../providers/curriculum/curriculum";
import { CompetencyProvider } from "../../providers/competency/competency";
import { Competency } from "../../models/competency";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { AgendaComponent } from "../agenda/agenda";
import { EnrollmentComponent } from "../enrollment/enrollment";

/**
 * Generated class for the CurriculumsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "curriculums",
  templateUrl: "curriculums.html"
})
export class CurriculumsComponent implements OnInit {
  @ViewChild(Slides) slides: Slides;

  competency: any;
  history: any;
  idCompetency: number;
  text: string;
  isEnrollmentHidden: boolean = true;
  training:any;

  @Input("progress") progress;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    private curriculumProvider: CurriculumProvider,
    private competencyProvider: CompetencyProvider,
    private modalController: ModalController,
    public navParams: NavParams
  ) {
    this.idCompetency = navParams.get("idCompetency");
  }

  ngOnInit() {
    this.getCompetency();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.history = this.competency.Competency[currentIndex].History;
    this.progress = this.competency.Competency[currentIndex].Percentage;

    console.log(this.history);
  }

  getCompetency() {
    this.competency = this.competencyProvider
      .getCompetency(this.idCompetency)
      .subscribe((comp: Competency) => {
        this.competency = comp;
        this.history = this.competency.Competency[0].History;
        this.progress = this.competency.Competency[0].Percentage;
      });
  }

  openCalendar(value) {
    let calendarModal = this.modalController.create(AgendaComponent);
    calendarModal.present();
  }

  onClick(training, status){
    if(status == "NOT_STARTED"){
      this.isEnrollmentHidden = false;
      this.training = training;
    }
  }

  ionViewDidLoad() {
    this.events.publish("hideHeader", { isHidden: true });
  }
}
