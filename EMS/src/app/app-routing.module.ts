import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {FooterComponent} from "./footer/footer.component";

const routes: Routes = [{path:'', redirectTo:'/home', pathMatch:'full'},
                        {path:'home', component: HomeComponent},
                        {path:'footer', component:FooterComponent},
                        { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
                        {path:'**', component:ErrorPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
