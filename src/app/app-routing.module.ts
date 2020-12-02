import{ExtraOptions,RouterModule, Routes} from '@angular/router' ;
import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';

//application level component
import {AppComponent} from './app.component';
const routes: Routes = [
  {path:'record',component:AppComponent},
  {path:'', redirectTo:'record', pathMatch:'full'},
  {path:'**', redirectTo:'record'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations:[]
  //exports: [RouterModule]
})
export class AppRoutingModule { }
