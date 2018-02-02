import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
/**
 * Generated class for the FooterCommomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-commom',
  templateUrl: 'footer-commom.html'
})
export class FooterCommomComponent {
  public isHidden: boolean = true;
  text: string;

  constructor(public events: Events) {

    //This if for hide footer from LoginPage
    events.subscribe('hideHeader', (data) => {
      this.isHidden = data.isHidden;
    })
    console.log('Hello FooterCommomComponent Component');
    this.text = 'Hello World';
  }

}
