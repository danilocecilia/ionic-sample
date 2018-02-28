import { Component } from '@angular/core';
import { PrePostTestComponent  } from "../../components/pre-post-test/pre-post-test";
import { NavController } from 'ionic-angular';
/**
 * Generated class for the AssessmentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'assessment',
  templateUrl: 'assessment.html'
})
export class AssessmentComponent {

  constructor(private navCtrl : NavController) {
  
  }


  onClickOpenAssessment(){
    this.navCtrl.push(PrePostTestComponent, {});
  }
}
