import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {LoginComponent} from "./customers/login/login.component";
import {FormBuilder, Validators} from "@angular/forms";
import {Name, Password} from "./SharedValidator/Validator";
import {Router} from "@angular/router";
import {ApplicationService} from "./Services/application.service";
import {UserDetails} from "./user-details";
import {SeasionsService} from "./Services/seasions.service";
import {UsersService} from "./Services/users.service";
import {DummyApiService} from "./Services/ExternalApi/dummy-api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'EMS';
  SizeofCart:number=0;
  searchTerm: string = '';
  user:boolean=false;
  message:string=''
  userEmail: string='Welcome';

  constructor(private route:Router,private formBuilder:FormBuilder,private applicationService:ApplicationService,private sasionsService:SeasionsService,
              private usersService:UsersService,private  dummyApi:DummyApiService) {}

 ngOnInit(){
    if(this.sasionsService.getCurrentUser()!=null){
      this.usersService.getCartSize(this.sasionsService.getCurrentUser()).subscribe((data) => {
        this.SizeofCart=data;
      },error => {
        if (error.status === 0) {
          console.log("Backend is down or unreachable");
        } else {
          console.error("HTTP error:", error);
        }
      })
    }

   if ((this.sasionsService.getCurrentUser()!=null)) {
     (this.userEmail = "Hi " + this.sasionsService.getCurrentUser().substring(0, 8))
     this.user=true
   } //todo need to fix this
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
  };

  Test() {
    this.Register.setValue({
      name: this.Details.name,
      surname: this.Details.Surname,
      email:this.Details.Email,
      password: this.Details.password,
      confirmPassword: this.Details.password
    });
  }
  TestLogin(){
    this.Login.setValue({
      email: this.Details.Email,
      password: this.Details.password
    })
  }


OnSubmint() {

  let UserDetils:string=JSON.stringify(this.Register.value)
  if(this.Register.value==null ){  //todo:need to fix this
  alert("registration failed")
    this.message="registration failed";
  }
  else{
    this.usersService.Registration(UserDetils).subscribe(data => {

        this.message="Registration Successful";
        console.log(data)
      },
      error => {

        if (error.status === 0) {
          console.log("Backend is down or unreachable",error,"USER",UserDetils);
          this.message="backend problem";
          alert(this.message)
        } else {
          console.error("HTTP error:", error);
        }
    })
  }
}
LoginUser(){
    this.usersService.LoginUser(this.Login.value.email,this.Login.value.password).subscribe((data) => {
      if(!data){
        console.log("test",data)
        this.user=data
        this.message="Login unsuccessful password/email incorrect"
      }
      else{
        console.log("user ",data)
        this.sasionsService.SaveCurrentUser(this.Login.value.email)
        this.user=data
        this.message="Welcome "+this.sasionsService.getCurrentUser()
      }
    },(error)=>{
      if (error.status === 0) {
        console.log("Backend is down or unreachable");
      } else {
        console.error("HTTP error:", error);
      }
    })
}

  RegisterPage()
  {
    this.route.navigateByUrl('/registration').then(r => console.log(r))
  }
  SaveUserToSassion(Username:string){
    this.sasionsService.SaveCurrentUser(Username)
  }

  logout(){
    this.sasionsService.logout();
    this.user=false
    this.route.navigateByUrl(`/home`)

    alert("succesfully logout")
  }
  searchProducts(){
    this.dummyApi.SearchProductsfromDummyApi(this.searchTerm).subscribe((data) =>{
      //todo:still needs to add logic
      this.route.navigateByUrl(`/products?searched=${this.searchTerm}`).then(error => console.log(error))
      console.log(data)
    },error => {
      if (error.status === 0) {
        console.log("Backend is down or unreachable");
      } else {
        console.error("HTTP error:", error);
      }
    })
  }




}
