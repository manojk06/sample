import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http'
import { AppService } from './app.service';
import { InterInterceptor } from './inter.interceptor';
import {ToastrModule} from'ngx-toastr';
import {RatingComponent, ConfirmDialogComponent} from './rating/rating.component'
import { DatePipe } from '@angular/common';
import { TokenComponent } from './token/token.component';
import { AdminComponent } from './admin/admin.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { StudentComponent } from './student/student.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MustMatchDirective} from './mustMatch.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RatingComponent,
    ConfirmDialogComponent,
    TokenComponent,
    AdminComponent,
    AddadminComponent,
    StudentComponent,
    AddstudentComponent,
    ChangePasswordComponent, 
    MustMatchDirective,
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
