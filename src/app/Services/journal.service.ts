import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
//why can't you find this model?
import {JournalModel} from '../../../Models/JournalModel';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const url = environment.api;

@Injectable({
  providedIn: 'root'
})

export class JournalService {
viewOneJournalId?: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Headers' : 'content-type',
  'Access-Control-Allow-Methods' : 'POST, GET, DELETE, PUT',
  'Access-Control-Allow-Origin' : '*',
  'Cache-Control' : 'no-cache' })
  };

  constructor(
    private http: HttpClient,
    ) { console.log("journal service"); }

getJournal(userId?: string){
//get all journals based on the user id
  return this.http.get<Observable<JournalModel[]>>(url + '/Journal/GetAll?userID=' + userId,  { responseType: 'json' })
}

createJournal(journal: JournalModel){
  console.log(journal);
  console.log(journal.ActivityMetric?.activity);
  console.log(journal.ActivityMetric?.hadAttack);
  console.log(journal.ActivityMetric?.wasEffective);
  return this.http.post(url + '/Journal/Create', journal, this.httpOptions);
  //return this.http.post(url + '/Journal/Create' + "/" + journal.userID, journal, this.httpOptions);
}

getJournalById(id: string){
  //need the journal url
  this.viewOneJournalId = id;
  return this.http.get<JournalModel>(url + '/Journal/GetJournal?journalID=' + id, { responseType: 'json'});

}

deleteJournalById(id: string){
  return this.http.delete(url + '/Journal/Delete?journalID=' + id, this.httpOptions);
}

updateJournal(journal: JournalModel){
  return this.http.put(url + '/Journal/Update', journal, this.httpOptions);
}



}

