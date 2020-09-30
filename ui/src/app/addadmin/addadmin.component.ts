import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
username:any;
password:any;
conformpassword:any;
role:string;
contactnumber:any;
name:string;
hide:boolean=false;

  constructor(private appService:AppService,private router:Router) { }
  
  ngOnInit(): void {
  }
  
  submit(){
    let obj = {
      "jsonrpc": "2.0",
      "method": "UserService.AddAdmin",
      "params": [{"name":this.name,"username":this.username,"password":this.password,"role":this.role,"contactnumber":this.contactnumber}],
      "id": 1
    }
    this.appService.getPost(obj).subscribe(data =>{
      console.log(data.result)
      if(data.result!=null){
        this.router.navigate(['/admin'])
      }
    })
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  change() {

    this.hide = ! this.hide;
    
    }

}
