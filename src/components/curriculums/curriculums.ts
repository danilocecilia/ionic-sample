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
  private competency: any;
  // singleCompetency: Observable<Competency>;
  items: any;
  idCompetency: number;
  text: string;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    private curriculumProvider: CurriculumProvider,
    private competencyProvider: CompetencyProvider,
    public navParams: NavParams) {
    this.idCompetency = navParams.get("idCompetency");
  }

  ngOnInit() {
    this.getCompetency();
  }

  slideChanged() {
    
  }

  getCompetency() {
    this.competency = this.competencyProvider.getCompetency(this.idCompetency).subscribe((comp: Competency) => {
      console.log(comp);
      this.competency = comp;
    });
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true });
  }
}
