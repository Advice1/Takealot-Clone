import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ApplicationService} from "../Services/application.service";
import {DummyApiService} from "../Services/ExternalApi/dummy-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
  @Input() ame:string='Hello user';
constructor(private applicationService:ApplicationService,private dummyApiService:DummyApiService,private route:Router) {
}
/*@HostListener("mouseenter")
onM(){
  alert("hear")
}*/

categories:string[]=[]
application:String[] = this.applicationService.ApplicacionList();
departments:Array<string> =this.applicationService.DepartmentList();
picture:Array<String> = this.applicationService.ImagesPopullator();
filters():any|string{
  this.application.map((items)=>'departments')
}
  ngOnInit(): void {
  this.listCategoriesDummyApi()
  }
displayIndex(Index:string){
  alert(Index)
}
  GetAllProductsfromCategory(category:string){
    this.dummyApiService.DisplayProductByCategory(category).subscribe((data) =>{
      console.log("what ",data)
      this.route.navigateByUrl(`/products?category=${category}`).then(r => console.log(r))
      //https://stripe.com/docs/api/payment_methods/retrieve
      //https://developer.paypal.com/api/rest/requests/
      //https://www.youtube.com/watch?v=mT0ZJCQmoAI&list=PLyzY2l387AlPlX5gKQU9SRExGsu0NGW2X&index=3
    })
}
listCategoriesDummyApi(){
  this.dummyApiService.DummyApiCategory().subscribe((data) =>{
    this.categories=data;
    data.forEach(n =>{console.log("hey",n)})
  })
}

onChangeInit(){

}



}
