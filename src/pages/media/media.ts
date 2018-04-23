import { Component, OnInit } from '@angular/core';
import { AuthProvider } from "../../providers/auth/auth";
import { MediaProvider  } from "../../providers/media/media";
import { LoadingProvider } from '../../providers/loading/loading';
import { ModalController } from 'ionic-angular';
import { ModalMediaGaleryPage } from '../modal-media-galery/modal-media-galery';

@Component({
  selector: 'media',
  templateUrl: 'media.html'
})
export class MediaPage implements OnInit{
  media: any;

  constructor(
    private authProvider: AuthProvider, 
    private mediaProvider: MediaProvider,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController) {}

  ngOnInit(){
    this.loadMedias();
  }

  loadMedias(){
    this.loadingProvider.presentLoadingDefault();

    this.mediaProvider.loadMedias()
    .then((response) => {
      this.loadingProvider.dismissLoading();
      this.media = response;
      console.log(this.media);
    })
    .catch(err => {
      this.loadingProvider.dismissLoading();
      console.log(err);
    })
  }

  openGalery(item){
    let modal = this.modalCtrl.create(ModalMediaGaleryPage, {media: item});

    modal.present();
  }
}
