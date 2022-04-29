import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SHARD: Here To Pick Up The Pieces';
  imageUrl: string = "other";
  defaultImageUrl: string;
  darkmode: any;
  constructor()
  {
    this.defaultImageUrl  = "mountain.jpg";
    this.changeBackground();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.changeBackground();
  }

  changeBackground() {
    if(localStorage.getItem('currBackground') != null || localStorage.getItem('Background') != null)
    {
      let currBackground = localStorage.getItem('currBackground') as string;
      this.imageUrl = localStorage.getItem('Background') as string;
      if(currBackground != this.imageUrl){
        if(this.imageUrl != null){
          localStorage.setItem('currBackground', this.imageUrl);
          document.getElementById("bg-image")!.style.backgroundImage = "url(\"./assets/" + this.imageUrl + "\")";
        }
        else
          document.getElementById("bg-image")!.style.backgroundImage = "url(\"./assets/" + currBackground + "\")";
      }
      else
      document.getElementById("bg-image")!.style.backgroundImage = "url(\"./assets/" + this.imageUrl + "\")";
    }
    else
    {
      localStorage.setItem('currBackground', this.defaultImageUrl);
      document.getElementById("bg-image")!.style.backgroundImage = "url(\"./assets/" + this.defaultImageUrl + "\")";
    }
  }
  setColorPallet() {
    this.darkmode = 0;
    if(localStorage.getItem('userId') != null)
    {
      this.darkmode = localStorage.getItem('DarkMode');
    }
  //somehow change color pallet
  }
}
