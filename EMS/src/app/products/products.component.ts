import {Component, OnInit} from '@angular/core';
import {products} from "../model/apiproducts";
import {FakestoreService} from "../Services/ExternalApi/fakestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../Services/users.service";
import {SeasionsService} from "../Services/seasions.service";
import {DummyApiService} from "../Services/ExternalApi/dummy-api.service";
import {ProductList} from "../model/dummyProduct";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  GetAllproducts:products[] = [];
  AllProductsfromDummyApi!:ProductList;
  product!:products;
  constructor(private route:Router,private activeRoute:ActivatedRoute,private fakestoreService:FakestoreService,private usersService:UsersService,private dummyapi:DummyApiService,private sasionsService:SeasionsService) {}
  ngOnInit(): void {

      this.GetAllProductsfromCategory();

  }


    GetAllProductsfromFakeApi(){
    this.fakestoreService.products().subscribe((data) =>{ this.GetAllproducts = data;
    console.log("what do i get",data)

    } );
  }
  GetAllProductsfromdummystore(){
    this.dummyapi.productsfromDummyApi().subscribe((data) =>{
      this.AllProductsfromDummyApi=data;
      this.activeRoute.queryParams.subscribe((params) => {
        const extraString = params['category'];
        if (extraString) {
          console.log("checking",extraString);
        }
      });

    console.log("what ",data)
    })
  }
  GetAllProductsfromCategory(){
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['searched']) {
        const searchedItem = params['searched'];
      this.searchProducts(searchedItem)
      }
       else if (params['category']) {
        const category = params['category'];
          this.dummyapi.DisplayProductByCategory(category).subscribe((data) =>{
            this.AllProductsfromDummyApi=data;
            console.log("category ",data)
          })
      }
      else {
        this.GetAllProductsfromFakeApi()
        this.GetAllProductsfromdummystore();
      }
    });

  }
  searchProducts(searchedItem:string){
    this.dummyapi.SearchProductsfromDummyApi(searchedItem).subscribe((data) =>{
     this.AllProductsfromDummyApi=data
      console.log(searchedItem,data)
    })
  }


  onClickView(ProductsId: number) {
    this.route.navigateByUrl(`/products/${ProductsId}`).then(r => console.log(r))
  }
  onClickViewDummyApi(ProductsId: number) {
    //todo:should input and output t
    this.route.navigateByUrl(`/products/${ProductsId}`).then(r => console.log(r))
  }
  ProductfromfakestoretoAddToCart(productsId: number){
    this.fakestoreService.myProduct(productsId.toString()).subscribe(data =>
    {
      this.product=data
      this.product.user=this.sasionsService.getCurrentUser()    //todo: handle different scenarios
      if( this.product.user!=null)
      {
        alert("user"+this.product.user+"session"+this.sasionsService.getCurrentUser())
        this.addToCart();
      }
      else{
        alert("login first")
      }

    },(error)=> {
      if (error.status === 0) {
        console.log("Backend is down or unreachable");
      } else {
        console.error("HTTP error:", error);
      }
    });
  }
  addToCart(){
    //todo:add to cart
    this.usersService.addToCart(this.product).subscribe((data)=>{console.log(data)},error => {
      if (error.status === 0) {
        console.log("Backend is down or unreachable");
      } else {
        console.error("HTTP error:", error);
      }

    })

  }
}
