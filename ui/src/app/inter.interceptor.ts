import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {tap} from'rxjs/operators'
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request);
    
  //   let b64=localStorage.getItem('data')
  //   // console.log("interceptor calling",request)
  //   request=request.clone({headers:request.headers.set('Authorization',"Bearer "+b64)})
  //  console.log(request.headers)
  //   return next.handle(request).pipe(tap(data =>{
  //     console.log(data)
  //  if (data instanceof HttpResponse) {
  //    if(data.body.error!=null){
  //    this.toastr.error(data.body.error)
  //    }
  //  }
  //   },
  //   (error)=>{
  //     if(error.status==401){
  //       console.log(error.error)
  //     this.toastr.error(error.error)
  //     }
  //   }
  //   )



  //   )

  }
}
