import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as APPConfig from "../../app/config";

@Component({
  selector: 'page-modal-media-galery',
  templateUrl: 'modal-media-galery.html',
})

export class ModalMediaGaleryPage {
  media:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.media = this.navParams.get('media');
    this.buildFullPathImage();
  }

  buildFullPathImage(){
    this.media.Files.forEach(element => {
      element.FullPathMedia = `${APPConfig.cfg.baseUrl}${element.Path}/${element.FileName}`;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMediaGaleryPage');
  }

  onCloseModal() {
    this.navCtrl.pop();
  }
}
