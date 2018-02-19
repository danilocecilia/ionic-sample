import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { CurriculumsComponent } from "../../components/curriculums/curriculums";
import { CurriculumProvider } from "../../providers/curriculum/curriculum";

@IonicPage()
@Component({
  selector: "page-curriculum",
  templateUrl: "curriculum.html"
})
export class CurriculumPage implements OnInit {
  curriculum: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public curriculumProvider: CurriculumProvider
  ) {}

  ngOnInit() {
    this.loadCurriculum();
  }

  loadCurriculum() {
    this.curriculum = this.curriculumProvider
      .loadCurriculum()
      .subscribe(res => {
        this.curriculum = res[0];
      });
  }

  radioChecked(value) {
    this.navCtrl.push(CurriculumsComponent,  { idCompetency: value });
  }

  // ionViewDidLoad() {
  //   this.events.publish("hideHeader", { isHidden: true });
  // }

  // viewDidLeave() {
  //   this.events.publish("hideHeader", { isHidden: true });
  // }
}
