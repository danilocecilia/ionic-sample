import { Component, OnInit } from '@angular/core';
import { AuthProvider } from "../../providers/auth/auth";
import { MediaProvider  } from "../../providers/media/media";

@Component({
  selector: 'media',
  templateUrl: 'media.html'
})
export class MediaPage implements OnInit{
  media: any;

  constructor(
    private authProvider: AuthProvider, 
    private mediaProvider: MediaProvider) {this.loadMedias();}

  ngOnInit(){
    
  }

  loadMedias(){
    debugger;
    this.mediaProvider.loadMedias()
    .then((response) => {
      debugger;
      this.media = response;
    })
    .catch(err => {
      console.log(err);
    })
  }
}
