import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

getPost(obj){
  return this.http.post<any>('/rpc',obj)
}
getmail(){
  return localStorage.getItem('mail')
}
getrole(){
  return localStorage.getItem('role')
}
getrollNo(){
  return localStorage.getItem('rollNo')
}
getName(){
  return localStorage.getItem('name')
}


}
