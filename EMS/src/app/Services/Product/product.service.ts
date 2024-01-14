import { Injectable } from '@angular/core';
import {SeasionsService} from "../seasions.service";
import {UsersService} from "../users.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private sessionService:SeasionsService,private userService:UsersService) { }

  CheckExistingCart(username:string,id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userService.CheckExistingCart(username,id.toString()).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          if (error.status === 0) {
            console.log("Backend is down or unreachable");
          } else {
            console.error("HTTP error:", error);
          }
          reject(error);
        }
      );
    });

  }
}
