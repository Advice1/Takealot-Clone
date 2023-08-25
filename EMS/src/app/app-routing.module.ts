import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {FooterComponent} from "./footer/footer.component";
import {ProductsComponent} from "./products/products.component";
import {MyproductComponent} from "./myproduct/myproduct.component";

const routes: Routes = [{path:'', redirectTo:'/home', pathMatch:'full'},
                        {path:'home', component: HomeComponent},
                        {path:'products', component:ProductsComponent},
                        {path:'myproduct', component:MyproductComponent},
                        {path:'footer', component:FooterComponent},
                        { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
                        {path:'**', component:ErrorPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
