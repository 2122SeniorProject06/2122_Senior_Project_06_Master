import { Component, HostListener, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'animations';

@Component({
  selector: 'app-stepper',
  animations: [ Animations.loadingTrigger],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  showLoading: boolean; // Shows the loading bar.
  targetEvent: HTMLElement; // The actual target to load.
  bgImage: HTMLElement | null = document.createElement('br');

  fiveSights: FormGroup;
  fourTouches: FormGroup;
  threeSounds: FormGroup;
  twoSmells: FormGroup;
  oneTaste: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,) {
    this.showLoading = false;
    this.targetEvent = document.createElement('br');

    this.fiveSights = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
    });
    this.fourTouches = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
    });

    this.threeSounds = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
    });
    this.twoSmells = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });
    this.oneTaste = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

    ngOnInit(): void {
      this.bgImage = document.getElementById("bg-image");
      this.bgImage!.style.filter = "blur(8px)";
    }

    /**
     * Unblurs the background image on leaving the page.
     * @param event Event that triggers the unblurring.
     */
    @HostListener('window:popstate', ['$event'])
      onPopState(event : Event) {
          this.bgImage!.style.filter = '';
    }

    /**
     * Activates the loading animation 
     * and unblurs the background image.
     */
     goToMainMenu() {
      this.activateLoadingAnimation('/main-menu', "MAIN MENU")
      this.onPopState(new Event('Changing Screens'))
  }

  /**
   * Assigns the next target for the loading screen to route to.
   * @param routeLink The route link to follow.
   * @param routeName The name of next page.
   */
  activateLoadingAnimation(routeLink: string, routeName: string) {
      let mainMenuEvent = document.createElement('p');
      let mainMenuParent = document.createElement('div');
      mainMenuParent.id = routeLink;
      mainMenuEvent.innerHTML = routeName;
      mainMenuParent.appendChild(mainMenuEvent);
      this.targetEvent = mainMenuEvent;
      this.showLoading = true;
  }

  restartStepper() {
    window.location.reload();
  }
}
