import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/service/wishlist.service';
import { Subscription } from 'rxjs';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit,OnDestroy{
private readonly _WishlistService=inject(WishlistService)
private readonly _AuthService=inject(AuthService)
wishlistSub!:Subscription
wishlist:IWishlist[]=[]

ngOnInit(): void {
  this.wishlistSub = this._WishlistService.getProductsWishlist().subscribe({
    next:(res)=>{

this.wishlist=res.data

console.log(this.wishlist);

    },
    error:(err)=>{
console.log(err);

    }
  })
}
ngOnDestroy(): void {
  this.wishlistSub?.unsubscribe()
}


removeFromWishlist(id:string):void{
this._WishlistService.deleteFromWishlist(id).subscribe({
  next:(res)=>{
console.log('removefromwishl',res.data);
// this.wishlist=res.
// this._WishlistService.WishlistNumber.next(res.lenght)
  },
  error:(err)=>{
console.log(err);

  }
})
}
}
