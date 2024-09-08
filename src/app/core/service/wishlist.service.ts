import { WishlistComponent } from './../../components/wishlist/wishlist.component';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);
  
  WishlistNumber:BehaviorSubject<number>=new BehaviorSubject(0);


  addToWishlist(id:string): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/wishlist`, 
    {
      productId: id,
    });
  }
  deleteFromWishlist(id:string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/wishlist/${id}`);
  }
  getProductsWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/wishlist`);
  }
}
