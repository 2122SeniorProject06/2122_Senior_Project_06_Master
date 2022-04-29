import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio-meditation',
  templateUrl: './audio-meditation.component.html',
  styleUrls: ['./audio-meditation.component.css']
})
export class AudioMeditationComponent {
  title = 'audioMeditation';
  isPlaying: boolean = false;
  constructor(
    private router: Router,
    
    ) { }
  goToMain() {
    this.router.navigateByUrl('/main-menu');
  }
  audio = new Audio("../../assets/Deep-sleep-meditation-music-relax-mind-dody.wav");
   

  playsound()
  {
     this.audio.load();
    
     this.audio.play();
     this.isPlaying = true;
     
  }
  pausesound()
  {
      this.audio.pause();
      this.isPlaying = false;
  }
  ngOnDestroy()
  {
      if(this.audio)
      {
          this.audio.pause();
        

      }

  }
}
