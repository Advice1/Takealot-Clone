import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {UserDetails} from "../user-details";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private Url:string ="http://localhost:8080/greeting/"
  constructor(private http: HttpClient) { }

   Registration(userDetails:string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.post(this.Url,userDetails,options);
    }


}
