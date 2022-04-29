import { AccountEdit } from '../../../Models/UserModels';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../Services/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animations } from 'animations';
import { HostListener } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
    selector: 'settings',
    animations: [Animations.loadingTrigger],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
  })
  export class SettingComponent implements OnInit {
    showLoading: boolean = false; // Shows the loading bar.
    targetEvent: HTMLElement = document.createElement('br'); // The actual target to load.
    bgImage: HTMLElement | null = document.createElement('br');
    updatedSettings: AccountEdit = new AccountEdit();
    constructor(private UserService: UserService){}

    ngOnInit(): void {
        this.bgImage = document.getElementById("bg-image");
        this.bgImage!.style.filter = "blur(8px)";
        //get all images in a array, send array to html for dynammic display
    }

    saveBackground(background: string) {
        this.updatedSettings.background = background;
        this.updatedSettings.userID = localStorage.getItem('userId');
        this.updatedSettings.darkMode = localStorage.getItem('DarkMode') == "true";
        console.log(this.updatedSettings);
        this.UserService.updateAccount(this.updatedSettings).subscribe(() => {
            localStorage.setItem('Background',background);
            this.reloadCurrentPage();
        });
    }
    reloadCurrentPage() {
        window.location.reload();
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
  }
