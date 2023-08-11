import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Myform, Password, Validate} from "../../SharedValidator/Validator";
import {UserDetails} from "../../user-details";
import {ApplicationService} from "../../Services/application.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private formbuilder:FormBuilder,private applicationService:ApplicationService) {}
  Register = this.formbuilder.group({
    name: ['',[Validators.maxLength(40),Validators.required,Validators.pattern("[A-Za-z]*$")]],
    surname: ['',[Validators.maxLength(40),Validators.required,Validators.pattern("[A-Za-z]*$")]],
    email: ['',[Validators.required,Validators.max(60),Validators.email]],
    password: ['',Password],
    confirmPassword: ['',Password]   //for testing
  });

  MyArray:String[]=this.applicationService.ApplicacionList();

  GetPassword():any{
    return this.Register.get('password');
  }
  GetEmail():any{
    return this.Register.get('email');
  }
  GetName():any{
    return this.Register.get('name');
  }
  GetSurname():any {
 return this.Register.get('surname');
  }
  //inteface
 Details : UserDetails = {
    name:'Advice',
    Surname:'Nxumalo',
    Email:'drnxumza@gmail.com',
    password:'0784061792',
   Test:[]
};

  Test() {
  this.Register.setValue({
    name: this.Details.name,
    surname: this.Details.Surname,
    email:this.Details.Email,
    password: this.Details.password,
    confirmPassword: '123'
  });

  }


}
