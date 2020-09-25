import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import {LoginComponent} from './login/login.component'
import { EmpComponent } from './emp/emp.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddempComponent } from './addemp/addemp.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'add',component:AddComponent},
  {path:'emp',component:EmpComponent},
  {path:'adduser',component:AdduserComponent},
  {path:'addemp',component:AddempComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
