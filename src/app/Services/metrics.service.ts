import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
//why can't you find this model?
import {MerticsModel} from '../../../Models/MetricsModel';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const url = environment.api;

@Injectable({
  providedIn: 'root'
})

export class MetricsService {
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
    ) { console.log("metrics service"); }

getOccurances(userId?: string){
//get most effective occurances based on the user id
  return this.http.get(url + '/Metric/GetOccurances?userID=' + userId,  { responseType: 'json' })
}

getTotalOccurances(userId?: string){
  //get total occurances based on the user id
  return this.http.get(url + '/Metric/GetTotalOccurances?userID=' + userId, {responseType: 'json'});
}

getMostHelpful(userId?: string){
  //get an array of top three most effective methods
  return this.http.get(url + '/Metric/GetMostHelpful?userID=' + userId, {responseType: 'json'});
}
}
