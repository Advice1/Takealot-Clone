import {Component, OnInit} from '@angular/core';
import {FakestoreService} from "../Services/ExternalApi/fakestore.service";
import {products} from "../model/apiproducts";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../Services/users.service";
import {SeasionsService} from "../Services/seasions.service";
import {DummyApiService} from "../Services/ExternalApi/dummy-api.service";
import {Product, ProductList} from "../model/dummyProduct";

@Component({
  selector: 'app-myproduct',
  templateUrl: './myproduct.component.html',
  styleUrls: ['./myproduct.component.scss']
})
export class MyproductComponent implements OnInit{
product!:products;
dummyApiProduct!:Product
count:number=0
productId!:string|null;

  constructor(private fakestoreService:FakestoreService,private activeRoute:ActivatedRoute,private usersService:UsersService,private dummyApi:DummyApiService,private sasionsService:SeasionsService) {}
  ngOnInit(): void {

      this.ProductfromDummystore();

      this.myProductfromfakestore();

  }
  //todo:should have service to handle this to avoid code duplicate
  myProductfromfakestore(){
    /*this.activeRoute.params.subscribe(data => {this.productId=data['id']})*/
    this.productId=this.activeRoute.snapshot.paramMap.get("id")
    this.fakestoreService.myProduct(this.productId).subscribe(data =>
    {this.product=data
    this.product.user=this.sasionsService.getCurrentUser() //todo:handle nulls and error

    /*  if (this.sasionsService.getCurrentUser()) {
        // Successfully retrieved the user information.
        this.product.user = this.sasionsService.getCurrentUser();
      } else {
        // User is not authenticated, handle accordingly (e.g., redirect to login).
        console.log("User is not authenticated.");
      }
    },
      (error) => {
        // Handle errors here.
        if (error.status === 401) {
          // Unauthorized - User session has expired or not authenticated.
          console.log("User session has expired or not authenticated. Redirect to login page.");
          // You can also choose to clear user-related data or take other actions.
        } else if (error.status === 403) {
          // Forbidden - User doesn't have permission for this action.
          console.log("User doesn't have permission for this action.");
        } else {
          // Handle other types of errors (e.g., network errors).
          console.error("An error occurred:", error);
        }*/

    });
  }

  ProductfromDummystore(){
    this.activeRoute.params.subscribe(data => {this.productId=data['id']
      this.dummyApi.DummyApiProduct(this.productId).subscribe((data) =>
      {this.dummyApiProduct=data
        // this.product.user=this.sasionsService.getCurrentUser() //todo:handle nulls and error
        console.log('dummy',data)
        console.log('dummy2',this.dummyApiProduct)
      });
    })

  }
  addToCart():number{
    this.count++;
    //todo:add to cart
    this.usersService.addToCart(this.product).subscribe((data)=>console.log(data))


    alert(this.count)
    return this.count;
  }




}
