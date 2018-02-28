import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { CurriculumsComponent } from "../../components/curriculums/curriculums";
import { CurriculumProvider } from "../../providers/curriculum/curriculum";
import { LoadingProvider  } from "../../providers/loading/loading";
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
    public curriculumProvider: CurriculumProvider,
    private loadingProvider: LoadingProvider
  ) {}

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadCurriculum();
  }

  loadCurriculum() {
    this.curriculum = this.curriculumProvider
      .loadCurriculum()
      .subscribe(res => {
        this.loadingProvider.loading.dismiss();
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
