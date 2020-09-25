import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  firstname:string
  lastname:string
  age:number
  mailid:string
  constructor() { }

  ngOnInit(): void {
  }
  sumbit(){

  }
  cancel(){
    
  }

}
