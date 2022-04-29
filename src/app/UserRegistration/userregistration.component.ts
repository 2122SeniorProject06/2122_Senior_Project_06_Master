import { UserRegistration } from '../../../Models/UserModels';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../Services/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animations } from 'animations';
import { HostListener } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'user-registration',
  animations: [Animations.loadingTrigger],
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  
  showLoading: boolean = false; // Shows the loading bar.
  targetEvent: HTMLElement = document.createElement('br'); // The actual target to load.
  bgImage: HTMLElement | null = document.createElement('br');

  form!: FormGroup;
  confirmedPassword?: string;
  isRegistered: boolean = false;
  notRegistered: boolean = false;
  passVerification: boolean[] = [true,true,true,true];
  ifNull: boolean[] = [false,false,false,false];
  errorResults: boolean[] = [true,true,true,true];
  errorMessage: string[] = ["", "", "", ""];
  registerModel: any;
  registerForm?: any;
  registerUser!: UserRegistration;
  errorMessages: string[] = ["","","",""]
  passwordErrorTypes: string[] = ["- The password must be at least more than 8 lengths.",
                                  "- The password must contain at least one lowercase character.",
                                  "- The password must contain at least one capital character.",
                                  "- The password must contain at least one number." ]

  constructor(
    private UserService: UserService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("OnInit");

    this.bgImage = document.getElementById("bg-image");
    this.bgImage!.style.filter = "blur(8px)";

    this.form = this.formBuilder.group({
      Email: ['', Validators.required ],
      Username: ['', Validators.required ],
      Password: ['', Validators.required ],
      confirmpassword: ['', Validators.required ],
    });
  }
  get f() { return this.form.controls }

/*
  Pair Programmed with Andrew, he was helpful with his knowledge of the API controllers
  Registration error handling pair programmed with Andrew, Sarah, and Hugo
*/
  /**
   * Very
   */
  Register() {
    const registerForm = new FormData();
    registerForm.append('Email', this.form.get('Email')?.value);
    registerForm.append('Username', this.form.get('Username')?.value);
    registerForm.append('Password', this.form.get('Password')?.value);
    registerForm.append('confirmpassword', this.form.get('confirmpassword')?.value);

    const registerModel = new UserRegistration();
    registerModel.email = this.form.get('Email')?.value;
    registerModel.username = this.form.get('Username')?.value;
    registerModel.password = this.form.get('Password')?.value;
    registerModel.confirmedPassword = this.form.get('confirmpassword')?.value;

    this.UserService.register(registerModel).subscribe((result: any) =>{
      if(!result.verificationResults.includes(false)) { //if result all true then no error occured and account is created
        this.isRegistered = true;
        this.notRegistered = false;
        console.log(result.verificationResults);
        this.goToLogin();
      }
      else{ //if one result is false/user not registered
        this.errorResults = result.verificationResults;
        this.errorMessages = result.verificationErrors
        console.log(this.errorResults);
        console.log(this.errorMessages);
        
        this.isRegistered = false;
        this.notRegistered = true;
        
      } 
    })

  }

  goToLogin(){
    this.activateLoadingAnimation('/login', "LOGIN");
    this.onPopState(new Event('Changing Screens'))
  }

  goToMainMenu(){
    this.activateLoadingAnimation('/main-menu', "MAIN MENU");
    this.onPopState(new Event('Changing Screens'))
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