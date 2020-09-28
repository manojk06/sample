import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http'
import { AppService } from './app.service';
import { InterInterceptor } from './inter.interceptor';
import {ToastrModule} from'ngx-toastr';
import { EmpComponent } from './emp/emp.component';
import {RatingComponent} from './rating/rating.component'
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    LoginComponent,
    EmpComponent,
    RatingComponent
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, 
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [AppService,{ provide: HTTP_INTERCEPTORS, useClass: InterInterceptor, multi: true },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
