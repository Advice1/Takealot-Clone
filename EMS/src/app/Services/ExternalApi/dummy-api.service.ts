import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductList} from "../../model/dummyProduct";


@Injectable({
  providedIn: 'root'
})
export class DummyApiService {
  private Url:string ="https://dummyjson.com/products"

  constructor(private http:HttpClient) { }

  productsfromDummyApi():Observable<ProductList> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.get<ProductList>(this.Url,options);
  }
   SearchProductsfromDummyApi(searchTerm:string):Observable<ProductList> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this.http.get<ProductList>(`${this.Url}/search?q=${searchTerm}`,options);
  }

  DummyApiProduct(ProductId: string | null):Observable<Product>{
    let headers = new HttpHeaders({ 'content-Type': 'application/json'});
    let options = {headers: headers };
    return this.http.get<Product>(`${this.Url}/${ProductId}`,options)
  }
  DummyApiCategory():Observable<string[]>{
    let headers = new HttpHeaders({ 'content-Type': 'application/json'});
    let options = {headers: headers };
    return this.http.get<string[]>(`${this.Url}/categories`,options)
  }
  DisplayProductByCategory(Category:string):Observable<ProductList>{
    let headers = new HttpHeaders({ 'content-Type': 'application/json'});
    let options = {headers: headers };
    return this.http.get<ProductList>(`${this.Url}/category/${Category}`,options)
  }


}
