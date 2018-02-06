import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams } from 'ionic-angular';
import { CurriculumProvider } from '../../providers/curriculum/curriculum';
import { CompetencyProvider } from '../../providers/competency/competency';
import { Observable } from 'rxjs/Observable';
import { Competency } from '../../models/competency';
import { map } from 'rxjs/operators';

/**
 * Generated class for the CurriculumsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'curriculums',
  templateUrl: 'curriculums.html'
})
export class CurriculumsComponent implements OnInit {
  // competencies: Observable<Competency[]>;
  // singleCompetency: Observable<Competency>;
  competency: Competency;
  idCompetency: number;
  text: string;
  items: any;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    private curriculumProvider: CurriculumProvider,
    private competencyProvider: CompetencyProvider,
    public navParams: NavParams) {
    this.idCompetency = navParams.get("idCompetency");
    // this.curriculumProvider.load('', 1);
    // debugger;
  }

  // loadCompetencies() {
  //   this.competencyProvider.loadAllCompetencies().subscribe(comp => {
  //     debugger;
  //     this.competencies = comp
  //   },
  //     err => {
  //       console.log(err);
  //     });
  // }


  ngOnInit() {
    this.getCompetency();
    //this.loadCompetencies();
    // this.competencies = this.curriculumProvider.competencies;

    // this.singleCompetency = this.curriculumProvider.competencies.pipe(
    //   map(todos => todos.find(item => item.ID === 44))
    // );

    // this.curriculumProvider.loadAll();
    // console.log(this.competencies.ID);
    // //this.items = this.curriculumProvider.load('', 1);


  }

  slideChanged() {

  }

  getCompetency() {
    this.competencyProvider.getCompetency(this.idCompetency).subscribe(comp => { debugger; this.competency = comp },
      err => {
        console.log(err);
      });
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true });
  }
}
