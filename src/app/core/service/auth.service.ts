import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
// injection
  // constructor(private _HttpClient:HttpClient) { }
  private readonly _HttpClient= inject(HttpClient)
  private readonly _Router= inject(Router)

  userData:any=null;


  setRegisterForm(data:object):Observable<any>{
   return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup`,data)
  }
  setloginForm(data:object):Observable<any>{
   return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin`,data)
  }
//   setHomeForm(data:object)Observable<any>{
// return this._HttpClient.get(`${environment.baseURL}/api/v1/products`)
//   }
  // جيب وتفك token
 saveUserData():void{ 
if(localStorage.getItem('userToken') !== null){
this.userData=jwtDecode(localStorage.getItem('userToken') !)
console.log('userdata',this.userData);

}
 }


 signOut():void{
localStorage.removeItem('userToken');
this.userData=null;
setTimeout(() => {
  this._Router.navigate(['/login'])
}, 500);

 }

 setEmailVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`,data)
 }
 setCodeVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`,data)
 }
 resetNewPassword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`,data)
 }
}
