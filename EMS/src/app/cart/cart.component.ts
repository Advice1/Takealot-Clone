import {Component, OnInit} from '@angular/core';
import {UsersService} from "../Services/users.service";
import {products, StripeProduct} from "../model/apiproducts";
import {SeasionsService} from "../Services/seasions.service";
//import {Stripe,loadStripe} from "@stripe/stripe-js";

declare var Stripe:any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  //private stripe:Promise<Stripe | null>
  selectedValue:number=1;
  testValue:any
  cart:products[]=[]

  // Initialize product and selectedValue properties
  product: { quantity: number } = { quantity: 1 };

  stripeProduct!:StripeProduct
  somevalue: any;
  totalPrice: any;
constructor(private userservice:UsersService,private usersession:SeasionsService)  {
}
  ngOnInit(): void {

    this.allInChart();
    console.log("lord",this.somevalue)
  }
  OnEachQuantityChange(cart:products[]) {
  this.totalPrice = cart.reduce((InitialValue, data) => InitialValue + data.price*data.quantity, 0).toFixed(2);
    console.log('Selected Value:', this.totalPrice);
    //this.testValue = cart.reduce((InitialValue, data) => InitialValue - data.quantity,0);
  }
allInChart(){
  this.userservice.getAllCarts(this.usersession.getCurrentUser()).subscribe((data) =>{
    this.cart=data;


    this.cart.forEach(data =>{
      data.quantity=1
      console.log("my price data",data.price*this.selectedValue,)

    })

    this.totalPrice = this.cart.reduce((InitialValue, data) => InitialValue + data.price, 0);
    console.log("how many",this.totalPrice*this.selectedValue,)
  })
}
RemoveItem(id:number){
  this.userservice.RemoveItem(id).subscribe((data) => console.log(data,"check the total price",this.totalPrice))

}
Checkout(){

  let StripModel:StripeProduct={
    product : "Takealot products",
    Email : this.usersession.getCurrentUser(),
    quantity : this.selectedValue,
    description:"Enjoy Your Order Brought to you by Takealot",
    price : Math.round(this.totalPrice),
    success_url: 'http://localhost:4200/feedback/success',
    cancel_url: 'http://localhost:4200/feedback/cancel',
  }

this.userservice.StripeUrlDirect(StripModel).subscribe(data => {
  this.RedirectCheckout(data)
  console.log("my data",data)
  },
  (error)=>{
  console.log("error returning session Id",error)
  }
)
}
   RedirectCheckout(SessionID: string) {
    const strip = Stripe("pk_test_51NttltKdfsYm0s899gasEFoDQL6mlbmA6e5KS5tubLawN1wxwvZyaxBBzDpgUwVdAWjEJDkazFDOGiox2CYYMpMv006cYMcQcX")
    strip.redirectToCheckout({sessionId: SessionID})/*.then((result:any) => {
      if (result.error) {
        console.error("Stripe error:", result.error);
      }
    })
      .catch((error:any) => {
        console.error("An error occurred:", error);
      });*/

    //let strip = await loadStripe("pk_test_51NttltKdfsYm0s899gasEFoDQL6mlbmA6e5KS5tubLawN1wxwvZyaxBBzDpgUwVdAWjEJDkazFDOGiox2CYYMpMv006cYMcQcX")

   // strip?.redirectToCheckout({sessionId:s})
}

}

