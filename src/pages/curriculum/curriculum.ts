import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CurriculumsComponent } from '../../components/curriculums/curriculums';
/**
 * Generated class for the CurriculumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curriculum',
  templateUrl: 'curriculum.html',
})
export class CurriculumPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.events.publish('hideHeader', { isHidden: true });
  }

  radioChecked(value){
    this.navCtrl.push(CurriculumsComponent, value);
  }

  ionViewDidLoad() {
    this.events.publish('hideHeader', { isHidden: true });
  }

  viewDidLeave(){
    this.events.publish('hideHeader', { isHidden: true });
  }
}
