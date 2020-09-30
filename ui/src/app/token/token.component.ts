import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  duration:any;
  time = new Date()
  t1: any;
  now:any;
  constructor(public appService:AppService,public router:Router) { }

  ngOnInit(): void {
    this.now = this.time.toString().split(' ')[4];
    let a = this.now.split(':')[0]
    this.t1 = Number(a)
    this.interval()
  }
  interval() {
    if (this.t1 >= 12 && this.t1 < 15) {
        this.duration = "Today Breakfast"

    } else if (this.t1 >= 20 && this.t1 <22) {
        this.duration = "Today Lunch"


    } else if (this.t1 >= 8 && this.t1 < 10) {
        this.duration = "Yesterday Dinner"

    }
}
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
