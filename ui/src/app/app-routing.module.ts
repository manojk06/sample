import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {LoginComponent} from './login/login.component'
import { RatingComponent } from './rating/rating.component';
import { StudentComponent } from './student/student.component';
import { TokenComponent } from './token/token.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'ratings',component:RatingComponent},
  {path:'token',component:TokenComponent},
  {path:'admin',component:AdminComponent},
  {path:'addadmin',component:AddadminComponent},
  {path:'student',component:StudentComponent},
  {path:'addstudent',component:AddstudentComponent},
  {path:'changepassword',component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
