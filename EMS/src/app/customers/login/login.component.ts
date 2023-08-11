import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Myform, Password, Validate} from "../../SharedValidator/Validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private route:Router,private formBuilder:FormBuilder) {
  }

  Login=this.formBuilder.group({
    email: ['',[Validators.required,Validators.max(60),Validators.email]],
    password: ['',[Password]]
  })
  Validation(){
   // Myform.forEach((each)=>{this.Login.addControl(each.ControlName,each.Control)})
  }
  GetPassword():any{
   return this.Login.get('password');
  }
  GetEmail():any{
    return this.Login.get('email');
  }
  TestLogin(){
    this.Login.setValue({
      email: 'drnxumza@gmail.com',
      password: 'advice'
    })

    console.log("testing",this.Login.get('password'));
    console.log("test",this.Login.controls['password'])
  }

  Register()
  {
    this.route.navigateByUrl('/registration').then(r => console.log(r))
  }

}
