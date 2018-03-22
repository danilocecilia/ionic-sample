import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { CurriculumsComponent } from "../../components/curriculums/curriculums";
import { CurriculumProvider } from "../../providers/curriculum/curriculum";
import { LoadingProvider } from "../../providers/loading/loading";
import { ToastProvider } from "../../providers/toast/toast";
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
    private loadingProvider: LoadingProvider,
    private toast:ToastProvider
  ) {}

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadCurriculum();
  }

  loadCurriculum() {
    this.curriculum = this.curriculumProvider
      .loadCurriculum()
      .then(res => {
        this.loadingProvider.loading.dismiss();
        this.curriculum = res;
      })
      .catch(err => {
        this.loadingProvider.loading.dismiss();
        this.toast.presentToast("Erro ao carregar os curriculums.")
      });
  }

  radioChecked(value) {
    this.navCtrl.push(CurriculumsComponent, { idCompetency: value });
  }
}
