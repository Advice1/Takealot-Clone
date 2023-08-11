import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasionsService {
  User:any='current-user'
  constructor() { }
  SaveCurrentUser(loginedUser:string):any{
    window.localStorage.setItem(this.User,loginedUser)
   return  window.sessionStorage.setItem(this.User,loginedUser);
  }
  getCurrentUser():string|any{
   return window.sessionStorage.getItem(this.User);
  }
  logout(){
    window.sessionStorage.removeItem(this.User)
  }

}
