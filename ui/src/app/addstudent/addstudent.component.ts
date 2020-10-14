import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {
  rollno:number;
 
  contactnumber:any;
  dob:any;
  name:string;
  hide:boolean=false;
  constructor(private appService:AppService,private router:Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
  }
  submit(){
    let date = this.datePipe.transform(this.dob, "yyyy-MM-dd")
    let obj = {
      "jsonrpc": "2.0",
      "method": "UserService.AddStudent",
      "params": [{"name":this.name,"rollno":this.rollno,"dob":date,"contactnumber":this.contactnumber}],
      "id": 1
    }
    this.appService.getPost(obj).subscribe(data =>{
      if(data.result!=null){
        this.router.navigate(['/student'])
      }
    })
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  change() {
    this.hide = ! this.hide;
    }

}
