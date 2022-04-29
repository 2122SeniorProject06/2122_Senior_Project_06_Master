import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import {
  trigger,
  state,
  animate,
  transition,
  style,
  animation,
} from '@angular/animations';

//this will need to be edited to route the dynamic grid to the correct components, i added the html and css to the correct files
@Component({
  selector: 'app-mainmenu',
  animations: [
    trigger('loadingAnimation', [
      state('notLoading', style({
        height: '80%'
      })),
      state('loading', style({
        height: '*'
      })),
      transition('notLoading => loading', [
        animate('0.37s')
      ])
    ])
  ],
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})

export class MainMenuComponent implements OnInit {

  showLoading: boolean;
  isSignedIn: boolean;
  targetEvent: HTMLElement;
  testVar : string;
  inspireQuote : string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.isSignedIn = localStorage.getItem('userId') != null;
      this.testVar = "I NEED TO...";
      this.inspireQuote = "The great thing, then, in all education, is to make our nervous system our ally instead of our enemy.";
      this.showLoading = false;
      this.targetEvent = document.createElement('br');
   }

  ngOnInit() {
  }

  goToSignIn(){
    localStorage.setItem("loginRoute", this.router.url);
    localStorage.setItem("loginName", "Main Menu");
    this.activateLoadingAnimation("/login", "Sign In")
  }

  goToActivity(event:Event){
        let activity = event.currentTarget as HTMLElement;
        let routeLink = activity.id;
        let routeName = activity.innerText + " ACTIVITY";
        this.activateLoadingAnimation(routeLink, routeName);
  }

  goToAccount(event:Event){
    let activity = event.currentTarget as HTMLElement;
    let routeLink = activity.id;
    let activitySpan = activity.children[1] as HTMLElement;
    let routeName = activitySpan.innerText;
    this.activateLoadingAnimation(routeLink, routeName);
  }

  activateLoadingAnimation(routeLink: string, routeName: string) {
    let mainMenuEvent = document.createElement('p');
    let mainMenuParent = document.createElement('div');
    mainMenuParent.id = routeLink;
    mainMenuEvent.innerHTML = routeName;
    mainMenuParent.appendChild(mainMenuEvent);
    this.targetEvent = mainMenuEvent;
    this.showLoading = true;
  }

  logout(){
    localStorage.clear();
    location.reload();
  }

  goToSettings(){
    this.router.navigateByUrl('/settings');
  }
}
