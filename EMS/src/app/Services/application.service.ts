import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor() { }

  ApplicacionList():Array<String>{
    let Name: Array<string> =[];
    for(let count =0 ;count<14;count++){
      Name.push("Application  "+count);
    }
  return Name;
}
  ShopLink():Array<String>{
    let Name: Array<string> =[];
    for(let count =0 ;count<6;count++){
      Name.push("Clearance Sale  "+count);
    }
    return Name;
  }
  help():Array<String>{
    let Name: Array<string> =[];
    for(let count =0 ;count<6;count++){
      Name.push("Help Centre  "+count);
    }
    return Name;
  }
  account():Array<String>{
    let Name: Array<string> =[];
    for(let count =0 ;count<6;count++){
      Name.push("My Account  "+count);
    }
    return Name;
  }
  company():Array<String>{
    let Name: Array<string> =[];
    for(let count =0 ;count<6;count++){
      Name.push("About Us  "+count);
    }
    return Name;
  }
ImagesPopullator():Array<string>{
    let images: Array<string> = ["../../assets/Products/sell.jpg","../../assets/Products/sell2.jpg"];
    let picture: Array<string> = [];
    for(let count = 0 ; count<2 ;count++){
         picture.push(images[count])
    }
    return picture;
}
downloadplatformpictures():Array<string>{
    let picturs:Array<string> = ['../../assets/Downloadplatform/appStore.svg','../../assets/Downloadplatform/appGallary.svg','../../assets/Downloadplatform/GooglePlay.svg']
  return picturs;
}
DepartmentList():Array<string>{
    let depart: Array<string> =[] ;
    for(let count =0; count<15 ;count++){
      depart.push("department "+count )
    }
    return depart;
}


}
