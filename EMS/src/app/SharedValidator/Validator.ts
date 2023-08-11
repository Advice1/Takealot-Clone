import {AbstractControl, FormControl, Validators} from "@angular/forms";

export function Validate(control:AbstractControl):{[key:string]:boolean} | null{
  const Email = control.get('email');
  const Confirmpass = control.get('password');

  if(Email?.pristine || Confirmpass?.pristine){
    return null;
  }

  return Email && Confirmpass && Email.value !== Confirmpass.value ? {'Mismatch':true}:null;
  }

  export function Password(control:AbstractControl){
  if(control.get('password') != null ){
    return null
  }
  return {"Error":true};

  }
export function Name(control:AbstractControl){
  if(control.get('name') != null ){
    return null
  }
  return {"Error":true};
}
export function Surname(control:AbstractControl){
  if(control.get('surname') != null ){
    return null
  }
  return {"Error":true};
}

 export const Myform = [{
   ControlName: 'name',
   Control: new FormControl(null,[Validators.required]),
 },
   {
     ControlName: 'surname',
     Control: new FormControl(null,[Validators.required])
   },
   {
     ControlName: 'email',
     Control: new FormControl(null,[Validators.required,Validators.email])
   }];
