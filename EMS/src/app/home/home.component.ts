import {Component, HostListener, Input} from '@angular/core';
import {ApplicationService} from "../Services/application.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() ame:string='Hello user';
constructor(private applicationService:ApplicationService) {
}
/*@HostListener("mouseenter")
onM(){
  alert("hear")
}*/
application:String[] = this.applicationService.ApplicacionList();
departments:Array<string> =this.applicationService.DepartmentList();
picture:Array<String> = this.applicationService.ImagesPopullator();
filters():any|string{
  this.application.map((items)=>'departments')
}

displayIndex(Index:number):number{
  alert(Index)
  return Index;
}
onChangeInit(){

}

}
