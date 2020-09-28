import { Component, OnInit,ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
 email:any
 password:any
 rollNo:number
 password1:any
 obj:{}
  
  constructor(public router:Router,private http:HttpClient,private appService :AppService) { }

  ngOnInit(): void {
  
}
submit(){
  localStorage.setItem('mail',this.email)
  this.obj={"username":this.email,"password":this.password}
  
this.http.post<any>('/login',this.obj).subscribe(data =>{
  // localStorage.setItem('data',data)
  console.log(data)
  localStorage.setItem('role',data)
  
  if(data=='Login successfully'){
    this.router.navigate(['/add'])
  }else {
    this.router.navigate(['/login'])
  }

})

}
submit1(){
  // localStorage.setItem('mail',this.email)
  this.obj={"rollNo":this.rollNo,"password":this.password1}
  
this.http.post<any>('/loginstudent',this.obj).subscribe(data =>{
  console.log(data)
  this.appService.setRollNo(this.rollNo)
  this.appService.setStudent(data)
  this.router.navigate(['/ratings'])
  // localStorage.setItem('role',data)

})

}


}