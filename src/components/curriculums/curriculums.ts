import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { CurriculumProvider } from '../../providers/curriculum/curriculum';

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
export class CurriculumsComponent {

  text: string;
  items: any;

  public isDivHidden: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public events: Events, 
    private curriculumProvider: CurriculumProvider) {
    console.log('Hello CurriculumsComponent Component');
    
    this.getCurriculum('');
  }

  isFirstSlide(obj) {
    return this.isDivHidden = obj;
  }

  slideChanged() {
    this.isFirstSlide(true);
  }

  getCurriculum(idJobRole) {
    this.items = this.curriculumProvider.getCurriculum('', idJobRole);
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true });
  }
}
