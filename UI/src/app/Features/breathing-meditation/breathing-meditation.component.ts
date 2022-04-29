import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-breathing-meditation',
  templateUrl: './breathing-meditation.component.html',
  styleUrls: ['./breathing-meditation.component.css']
})
export class BreathingMeditationComponent implements OnInit {

  constructor(    private router: Router,) {
    
   }

  ngOnInit(): void {
  }
  
  goToMain() {
    this.router.navigateByUrl('/main-menu');
  }

}
