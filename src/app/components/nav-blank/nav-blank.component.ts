import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CartService } from '../../core/service/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { FlowbiteService } from '../../core/service/flowbite.service';
import { WishlistService } from '../../core/service/wishlist.service';
import { log } from 'console';


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit,OnChanges{
 readonly _AuthService=inject(AuthService)
// private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _CartService=inject(CartService)
private readonly _WishlistService=inject(WishlistService)

private readonly _FlowbiteService=inject(FlowbiteService)

cartDetails:ICart={} as ICart;

cartNum:number=0;
wishlistNum:number=0
ngOnInit(): void {
this._CartService.getProductsCart().subscribe({
  next:(res)=>{
    console.log('cartItem',res);
    this._CartService.cartNumber.next(res.numOfCartItems)
    
        }
})
this._WishlistService.getProductsWishlist().subscribe({
  next:(data)=>{
    console.log('wishl',data)
    this._WishlistService.WishlistNumber.next(data.count)
        }
})
  this._FlowbiteService.loadFlowbite(()=>{
    
  })
  this._CartService.cartNumber.subscribe({
    next:(data)=>{
this.cartNum=data
    }

  })
  this._WishlistService.WishlistNumber.subscribe({
    next:(data)=>{
      this.wishlistNum=data
          }
  })
}

ngOnChanges(changes: SimpleChanges): void {

  

}
}
