import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserAccount, UserLogin, UserRegistration, AccountEdit } from '../../../Models/UserModels';
import { Injectable } from "@angular/core";

const url = environment.api;
@Injectable({
  providedIn: 'root'
})

export class UserService {
constructor(private http: HttpClient){}
 httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type'})
};

 registerUser!: UserRegistration;
 loginUser!: UserLogin;
 updatedAcc!: AccountEdit;

login(loginModel: UserLogin){
  //once api is set up in backend, this function will make an http POST call
  //need the login url
return this.http.post(url + '/Login/Authenticate', loginModel, { responseType: 'text'});
}
 register(registerModel: UserRegistration){
   //once api is set up in backend this function will an http POST call to add user to database
   //need the register url
  return this.http.post(url + '/NewAccount/Create', registerModel, this.httpOptions);
 }

 getAccountInfo(id: string){
   return this.http.get<UserAccount>(url + '/Account/GetAllInfo?userID=' + id, { responseType: 'json'})
 }

updateAccount(updatedAcc: AccountEdit){
  return this.http.put<UserAccount>(url + '/Account/UpdateUser', updatedAcc, this.httpOptions)
}

}
