import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';
import { state } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title :string='Food Ratings';
  choose:any;
  time= new Date();
  timer;
  constructor(public router:Router,public service:AppService,private toaster:ToastrService){
  this.router.events.subscribe(res =>{
    if(res instanceof NavigationEnd){
      this.choose=res.url
    }
  })
  this.service.errorMessage.subscribe(state=>{
    if(state){
      this.toaster.clear();
      this.toaster.error(state)
    }
  });
  this.service.succesMessage.subscribe(state=>{
    if(state){
      this.toaster.clear()
      this.toaster.success(state)
    
    }
  });
  this.service.warningMessage.subscribe(state=>{
    if(state){
      this.toaster.clear()
      this.toaster.warning(state)
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
