import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title :string='My Map test project';
  choose:any;
  time= new Date();
  timer;
  constructor(public router:Router,public service:AppService){
  this.router.events.subscribe(res =>{
    if(res instanceof NavigationEnd){
      this.choose=res.url
    }
  })

    
  }
  ngOnInit() {
    this.timer=setInterval(() =>{
        this.time=new Date()
    },1000);
  }
  ngOnDestroy(){
    clearInterval(this.timer);
  }
logout(){
localStorage.clear()
this.router.navigate(['login'])
}

  
}
