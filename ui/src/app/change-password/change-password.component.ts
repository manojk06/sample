import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user:any={};
  HideOldPassword:boolean=true;
  HideNewPassword:boolean=true;
  flag:boolean=false;
  constructor(private appService:AppService,private router:Router){}

  ngOnInit(): void {
    this.user.email=localStorage.getItem('mail')
  }
  changePass(){
    let obj ={
      "jsonrpc": "2.0",
      "method": "UserService.ChangePassword",
      "params": [{"oldpassword":this.user.oldPassword,"newpassword":this.user.newPassword,"username":this.user.email}],
      "id": 1
    }
   this.appService.getPost(obj).subscribe(data =>{
     console.log(data)
     if(data.result!=null){
      this.appService.addSuccessMsg(data.result)
    this.router.navigate(['/login'])
     }else{
       this.appService.addErrorMsg(data.error)
     }
   })

  }

}
