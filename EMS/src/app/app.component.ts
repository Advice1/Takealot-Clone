import {Component, Input, SimpleChanges} from '@angular/core';
import {LoginComponent} from "./customers/login/login.component";
import {FormBuilder, Validators} from "@angular/forms";
import {Name, Password} from "./SharedValidator/Validator";
import {Router} from "@angular/router";
import {ApplicationService} from "./Services/application.service";
import {UserDetails} from "./user-details";
import {SeasionsService} from "./Services/seasions.service";
import {UsersService} from "./Services/users.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EMS';
  @Input() name="advice"
  constructor(private route:Router,private formBuilder:FormBuilder,private applicationService:ApplicationService,private sasionsService:SeasionsService,private usersService:UsersService) {}
  ngOnChanges(change: SimpleChanges){
  }
 ngOnInit(){

 }
 ngDoCheck(){
   this.ngOnInit()
 }
 ngAfterContentChecked(){
 }
 ngDistroy(){
    this.ngDoCheck()
 }
  Register = this.formBuilder.group({
    name: ['',[Validators.maxLength(40),Validators.required,Validators.pattern("[A-Za-z]*$")]],
    surname: ['',[Validators.maxLength(40),Validators.required,Validators.pattern("[A-Za-z]*$")]],
    email: ['',[Validators.required,Validators.max(60),Validators.email]],
    password: ['',Password],
    confirmPassword: ['',Password]   //for testing
  });

  Login=this.formBuilder.group({
    email: ['',[Validators.required,Validators.max(60),Validators.email]],
    password: ['',[Password]]
  })
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
  Details : UserDetails = {
    name:'Advice',
    Surname:'Nxumalo',
    Email:'drnxumza@gmail.com',
    password:'0784061792',
    Test:['Advice','Nxumalo'],
  };

  Test() {
    this.Register.setValue({
      name: this.Details.name,
      surname: this.Details.Surname,
      email:this.Details.Email,
      password: this.Details.password,
      confirmPassword: '123'
    });
    this.Details.Test.push("['BMW']")

  }
  TestLogin(){
    this.Login.setValue({
      email: this.Details.Email,
      password: this.Details.password
    })
  }

OnSubmint() {
  let UserDetils:string[]=JSON.stringify(this.Register.value).split(',')

  alert("TES"+JSON.stringify(this.Register.value))

  this.usersService.Registration(this.Details).subscribe(data => console.log(data))

 /* if(this.Register.get('name')?.value !== this.Details.name){
    alert('failed to log in'+this.Register.get('name')?.value)
  } */

}

  RegisterPage()
  {
    this.route.navigateByUrl('/registration').then(r => console.log(r))
  }
  Validation(){
    // Myform.forEach((each)=>{this.Login.addControl(each.ControlName,each.Control)})
  }
  SaveUserToSassion(Username:string){
    this.sasionsService.SaveCurrentUser(Username)
  }
  LoginInUser():string{
    alert("current user"+this.sasionsService.getCurrentUser());
   //need to clarify the condition if user is not logged in
    return this.sasionsService.getCurrentUser();
  }
  logout(){
    this.sasionsService.logout();
  }




}
