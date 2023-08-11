import { Component } from '@angular/core';
import {ApplicationService} from "../Services/application.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
constructor(private applicationService:ApplicationService) {
}

shop:Array<String>=this.applicationService.ShopLink();
help:Array<String>=this.applicationService.help();
account:Array<String>=this.applicationService.account();
company:Array<String>=this.applicationService.company();
Picture:Array<string>=this.applicationService.downloadplatformpictures();

}
