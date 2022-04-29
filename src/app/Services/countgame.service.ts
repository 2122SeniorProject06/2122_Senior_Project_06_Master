import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";

const url = environment.api;

@Injectable({
    providedIn: 'root'
  })
  
  export class CountGameService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Headers' : 'content-type',
    'Access-Control-Allow-Methods' : 'POST, GET, DELETE, PUT',
    'Access-Control-Allow-Origin' : '*'
     })
    };
  
    constructor(
      private http: HttpClient,
      ) { console.log("countgame service"); }
  
      getCountValue(countingValue: number){
          return this.http.get(url + '/CountingGame/GetCountVal/?countingValue=' + countingValue, { responseType: 'text'})
      }
    }