import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { CurriculumPage } from '../curriculum/curriculum';
/**
 * Generated class for the ModalJobrolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-jobrole',
  templateUrl: 'modal-jobrole.html',
})
export class ModalJobrolePage {
  @ViewChild('myNav') nav: NavController
  constructor(
    public navCtrl    : NavController, 
    public navParams  : NavParams,
    public appCtrl    : App,
    public viewCtrl   : ViewController) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalJobrolePage');
  }

  getCurriculum(){
    this.closeModal();
    //this.appCtrl.getRootNav().push(CurriculumPage);
    this.navCtrl.push(CurriculumPage);
  }

}
