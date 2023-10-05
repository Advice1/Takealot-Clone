import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {FooterComponent} from "./footer/footer.component";
import {ProductsComponent} from "./products/products.component";
import {MyproductComponent} from "./myproduct/myproduct.component";
import {CartComponent} from "./cart/cart.component";
import {FeedbackComponent} from "./feedback/feedback.component";

const routes: Routes = [{path:'', redirectTo:'/home', pathMatch:'full'},
                        {path:'home', component: HomeComponent},
                        {path:'products', component:ProductsComponent},
                        {path:'products/:id', component:MyproductComponent},
                        {path:'cart', component:CartComponent},
                        {path:'footer', component:FooterComponent},
                        {path:'feedback/:type', component:FeedbackComponent}, //
                        {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
                        {path:'**', component:ErrorPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
