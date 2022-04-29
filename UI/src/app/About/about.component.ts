import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animations } from 'animations';

@Component({
  selector: 'app-about',
  animations: [ Animations.loadingTrigger],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    showLoading: boolean; // Shows the loading bar.
    targetEvent: HTMLElement; // The actual target to load.
    bgImage: HTMLElement | null = document.createElement('br');
    aboutUs: string[];

    constructor(http: HttpClient) { 
        this.showLoading = false;
        this.targetEvent = document.createElement('br');
        this.aboutUs = [];
        http.get('assets/aboutUsMessage.txt', {responseType: 'text'})
        .subscribe(data =>  this.assignDataToArray(data) )
    }

    /**
     * Converts data from about us text to array for seperation and formatting in the HTML.
     * @param data The text string to split.
     */
    assignDataToArray(data: string){
        this.aboutUs = data.split("\r\n");   
    }

    /**
     * Blurs the background image.
     */
    ngOnInit() {
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
}