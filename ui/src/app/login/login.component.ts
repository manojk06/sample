import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any
  password: any
  rollNo: number
  dob: any
  obj: {}

  constructor(public router: Router, private http: HttpClient, private datePipe: DatePipe, public appService: AppService) { }

  ngOnInit(): void {

  }
  submit() {
    localStorage.setItem('mail', this.email)
    this.obj = { "username": this.email, "password": this.password }

    this.http.post<any>('/login', this.obj).subscribe(data => {
      localStorage.setItem('role', data)
      if (data == 'Login successfully') {
        this.router.navigate(['/admin'])
      }

    },(err)=>{
      if (err){
        this.appService.addErrorMsg("invalid Credential")
      }

    })

  }
  submit1() {
    let date=this.datePipe.transform(this.dob, "yyyy-MM-dd")
    let roll = this.rollNo.toString()
    localStorage.setItem('rollNo', roll)
    this.obj = { "rollno": this.rollNo, "dob": date }

    this.http.post<any>('/loginstudent', this.obj).subscribe(data => {
     
      if (data) {
        this.appService.setStudent(data)
        this.appService.setRollNo(this.rollNo)
        this.router.navigate(['/ratings'])
      } else {
        this.router.navigate(['/login'])
      }

    },(error)=>{
      if (error){
        this.appService.addErrorMsg(error.error)
      }
    })

  }


}