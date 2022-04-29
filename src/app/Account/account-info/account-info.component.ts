import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountEdit, UserAccount } from '../../../../Models/UserModels';
import { UserService } from 'src/app/Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent{
    @Input() accountInfo: UserAccount;
    isEdit: boolean = false;
    accountEdits: FormGroup;
    bgImage: HTMLElement | null = document.createElement('br');
    errorResults: boolean[] = [true,true,true,true];
    errorMessages: string[] = ["", "", "", ""];


    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private formBuilder: FormBuilder,
      private UserService: UserService) {
        this.accountInfo = new UserAccount();
        this.accountEdits = formBuilder.group({
          usernameCtrl: [''],
          emailCtrl: [''],
          newPassCtrl: [''],
          confirmCtrl: ['']

        });
     }
     ngOnInit() {

      this.bgImage = document.getElementById("bg-image");
      this.bgImage!.style.filter = "blur(8px)";
     }

     onSubmit() {
      const updateModel = new FormData();
      updateModel.append('usernameCtrl', this.accountEdits.get('usernameCtrl')?.value);
      updateModel.append('emailCtrl', this.accountEdits.get('emailCtrl')?.value);
      updateModel.append('newPassCtrl', this.accountEdits.get('newPassCtrl')?.value);
      updateModel.append('confirmCtrl', this.accountEdits.get('confirmCtrl')?.value);

      const accountModel = new AccountEdit();
      accountModel.new_Username = this.accountEdits.get('usernameCtrl')?.value;
      accountModel.new_Email = this.accountEdits.get('emailCtrl')?.value;
      accountModel.new_Password = this.accountEdits.get('newPassCtrl')?.value;
      accountModel.confirmedPassword = this.accountEdits.get('confirmCtrl')?.value;
      accountModel.userID = localStorage.getItem('userId');
      accountModel.darkMode = localStorage.getItem('DarkMode') == "true";
      accountModel.background = localStorage.getItem('Background') as string;
      console.log(accountModel);

      this.UserService.updateAccount(accountModel).subscribe((result:any)=>{
        console.log(result);
        if(!result.verificationResults.includes(false)){
          this.accountEdits.reset();
          this.isEdit = false;
          this.snackBar.open('Account information has been updated.', '', { duration: 1000});
          window.location.reload();
        }
        else{
          this.errorResults = result.verificationResults;
          this.errorMessages = result.verificationErrors
          console.log(this.errorResults);
          console.log(this.errorMessages);
        }
      })


    }
     switchToEdit(){
       this.isEdit = true;
     }

     cancelEdit(){
      this.accountEdits.reset();
      this.isEdit = false;
     }
}
