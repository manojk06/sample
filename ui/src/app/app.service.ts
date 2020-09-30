import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _errorMsg = new BehaviorSubject('');
  private _successMsg = new BehaviorSubject('');
  private _warnMsg = new BehaviorSubject('');

  constructor(private http:HttpClient) { }
  get succesMessage():Observable<any>{
    return this._successMsg.asObservable();
  }
  get errorMessage():Observable<any>{
    return this._errorMsg.asObservable();
  }
  get warningMessage():Observable<any>{
    return this._warnMsg.asObservable();
  }
  addSuccessMsg(msg:string){
    this._successMsg.next(msg)
  }
  addErrorMsg(msg:string){
    this._errorMsg.next(msg)
  }
  addWarnMsg(msg:string){
    this._warnMsg.next(msg)
  }

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
setRollNo(rollno){
  localStorage.setItem('rollno',rollno)
}
getRollNo(){
  return localStorage.getItem('rollno')
}
setStudent(name){
  localStorage.setItem('name',name)
}
getStudent(){
  return localStorage.getItem('name')
}
setToken(token){
  localStorage.setItem('token',token)

}
getToken(){
  return localStorage.getItem('token')
}

}
