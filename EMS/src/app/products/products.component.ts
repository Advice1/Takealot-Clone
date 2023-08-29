import {Component, OnInit} from '@angular/core';
import {products} from "../model/apiproducts";
import {FakestoreService} from "../Services/ExternalApi/fakestore.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  GetAllproducts:products[] = [];
  constructor(private fakestoreService:FakestoreService) {}
  ngOnInit(): void {
    this.GetAllProductsfromFakeApi()
  }


    GetAllProductsfromFakeApi(){
    this.fakestoreService.product().subscribe((data) =>{ this.GetAllproducts = data;
    console.log("what do i get",data)

    } );
  }


}
