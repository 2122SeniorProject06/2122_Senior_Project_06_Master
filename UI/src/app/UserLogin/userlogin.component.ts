import { UserService } from '../Services/user.service';
import { UserLogin, UserModel } from '../../../Models/UserModels';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Animations } from 'animations';
import { HostListener } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  animations: [ Animations.loadingTrigger],
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
  providers: [UserLogin, UserModel]
})
export class UserLoginComponent implements OnInit {
 
 loginModel: any;
 form: any;
 data: any;
 token?: string;
 error: any;
 currUser: any;
 awaitingAPI: boolean;
 showLoading: boolean; // Shows the loading bar.
 targetEvent: HTMLElement; // The actual target to load.
 bgImage: HTMLElement | null = document.createElement('br');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private UserService: UserService,
    private location: Location,
    private backgroundChange: AppComponent,
    ) {
      if(localStorage.getItem('userId') != null)
      {
        this.router.navigateByUrl('/main-menu');
      }
      this.awaitingAPI = false;
      this.showLoading = false;
      this.targetEvent = document.createElement('br');
    }

  ngOnInit() {

    this.bgImage = document.getElementById("bg-image");
    this.bgImage!.style.filter = "blur(8px)";

    this.form = this.fb.group ({
      Email: ['', Validators.required ],
      Password: ['', Validators.required ]
    })

    // if(localStorage.getItem('userId') != null){
    //   this.goToJournal();
    // }
  }

  get f(){
    return this.form.controls;
  }

  onSubmit() {
    const loginModel = new FormData();
    loginModel.append('Email', this.form.get('Email').value);
    loginModel.append('Password', this.form.get('Password').value);

    const login = new UserLogin();
    login.Email = this.form.get('Email').value;
    login.Password = this.form.get('Password').value;
    this.form.controls['Email'].disable();
    this.form.controls['Password'].disable();
    this.awaitingAPI = true;
    this.UserService.login(login).subscribe((result) => {
      this.data = result;
      let parsed = JSON.parse(this.data);
      //JSON.stringify(this.data);
      console.log(this.data);
      console.log(parsed);
      //clear prior to logging in
      localStorage.removeItem('userId');
      localStorage.removeItem('DarkMode');
      localStorage.removeItem('Background');
      console.log(localStorage.getItem('userId'));
      this.awaitingAPI = false;
      this.form.controls['Email'].enable();
      this.form.controls['Password'].enable();
      if (this.data){
        this.currUser = "";
        this.currUser = this.data;
        //set the local storage user id for easy access
        localStorage.setItem('userId', parsed.userID);
        localStorage.setItem('DarkMode', parsed.darkMode);
        localStorage.setItem('Background', parsed.background);
        this.backgroundChange.changeBackground();
        console.log("successful login");
        this.goToActivity();
      }
      //what is the angular function for this
      else if(this.data == null)
      {
        this.snackBar.open('Username or Password was Incorrect', '', {duration: 2500});
        console.log("unsuccessful login");
        this.router.navigate(['Login']);
      }
    })


  }

  goToRegistration(){
    //User is not registered and chooses to register via login page
    this.activateLoadingAnimation('/register', 'ACCOUNT CREATION');
  }

  goToActivity(){
     let routerLink = localStorage.getItem("loginRoute") as string;
     let routerName = localStorage.getItem("loginName") as string;
     localStorage.removeItem("loginRoute")
     localStorage.removeItem("loginName")
    this.activateLoadingAnimation(routerLink, routerName);
  }

  goToMainMenu(){
    this.activateLoadingAnimation('/main-menu', "MAIN MENU")
  }

  /**
   * Creates a html element to send to the loading animation to route to the next page.
   * @param routeLink The route path to take.
   * @param routeName The name of the activity to go to.
   */
  activateLoadingAnimation(routeLink: string, routeName: string){
    let mainMenuEvent = document.createElement('p');
    let mainMenuParent = document.createElement('div');
    mainMenuParent.id = routeLink;
    mainMenuEvent.innerHTML = routeName;
    mainMenuParent.appendChild(mainMenuEvent);
    this.targetEvent = mainMenuEvent;
    this.showLoading = true;
  }

    /**
     * Unblurs the background image on leaving the page.
     * @param event Event that triggers the unblurring.
     */
     @HostListener('window:popstate', ['$event'])
     onPopState(event : Event) {
         this.bgImage!.style.filter = '';
     }
}