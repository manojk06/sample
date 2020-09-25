import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent implements OnInit {
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
