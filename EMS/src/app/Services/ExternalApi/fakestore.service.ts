import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {products} from "../../model/apiproducts";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FakestoreService {
  //TODO:fake api url
  private Url:string ="https://fakestoreapi.com/products"
  constructor(private http:HttpClient) { }

  product():Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.get<any>(this.Url,options);
  }

}
