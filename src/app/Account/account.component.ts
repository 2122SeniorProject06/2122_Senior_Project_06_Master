import { AotCompiler } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountEdit, UserAccount, UserRegistration } from '../../../Models/UserModels';
import { UserService } from '../Services/user.service';
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    showLoading: boolean;
    isSignedIn: boolean;
    targetEvent: HTMLElement;
    bgImage: HTMLElement | null = document.createElement('br');
    userAccount: UserAccount = new UserAccount();

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private accountService: UserService) {
        this.isSignedIn = localStorage.getItem('userId') != null;
        this.showLoading = false;
        this.targetEvent = document.createElement('br');
     }

    ngOnInit() {
        this.bgImage = document.getElementById("bg-image");
        this.bgImage!.style.filter = "blur(8px)";
        this.getAccount();
    }

    getAccount(){
        let userID = localStorage.getItem('userId') as string;
        this.accountService.getAccountInfo(userID).subscribe((accountInfo) => {
            console.log(accountInfo);
            this.userAccount = accountInfo;
        })
    }

    /**
     * Unblurs the background image on leaving the page.
     * @param event Event that triggers the unblurring.
     */
    @HostListener('window:popstate', ['$event'])
        onPopState(event : Event) {
        this.bgImage!.style.filter = '';
    }

    goToMainMenu() {
        this.activateLoadingAnimation('/main-menu', "MAIN MENU")
        this.onPopState(new Event('Changing Screens'))
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

    restartStepper() {
      window.location.reload();
    }
}
