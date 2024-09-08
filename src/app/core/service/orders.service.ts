import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }
  myHeaders:any={token:localStorage.getItem('userToken')}

  checkOut(id:string|null,shippingDetails:object):Observable<any>{
return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${id}?url=${environment.URLServer}`,
  {
    "shippingAddress":shippingDetails
}
)
  }

  getUserOrder(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/orders/user/${id}`)
  }
}
