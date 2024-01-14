import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {products, StripeProduct} from "../model/apiproducts";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private Url:string ="http://localhost:8080/subscription/"
  private StripeUrl:string ="http://localhost:8080/Stripe/"

  constructor(private http: HttpClient) { }

   Registration(userDetails:string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.post(this.Url,userDetails,options);
    }
    LoginUser(username:string | null | undefined,password:string | null | undefined):Observable<boolean>{
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers };
      return this.http.get<boolean>(`${this.Url}/${username}/${password}`,options);
    }
  addToCart(carts:products){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.post(`${this.Url}/cart/`,carts,options);
  }
  CheckExistingCart(username:string,id:string):Observable<boolean>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.get<boolean>(`${this.Url}/cart/exist/${username}/${id}`,options);
  }
  getAllCarts(username:string):Observable<products[]>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.get<products[]>(`${this.Url}/cart/all/${username}`,options);
  }
  getCartSize(username:string):Observable<number>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/text' });
    let options = { headers: headers };
    return this.http.get<number>(`${this.Url}/cart/count/${username}`,options);
  }
  RemoveItem(id:number){
  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  let options = { headers: headers };
  return this.http.delete(`${this.Url}/remove/${id}`,options);
}
  StripeUrlDirect(carts:StripeProduct):Observable<string>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.post<string>(`${this.StripeUrl}/Customer/checkout/`,carts,options);
  }



}
