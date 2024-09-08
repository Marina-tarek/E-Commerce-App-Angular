import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy {
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)
cartSub!:Subscription
cartDetails:ICart={} as ICart
ngOnInit(): void {
  this.cartSub=this._CartService.getProductsCart().subscribe({
    next:(res)=>{
console.log(res.data);
this.cartDetails=res.data
    },
    error:(err)=>{
console.log(err);

    }
  })
}

ngOnDestroy(): void {
  this.cartSub?.unsubscribe()
}

deleteProduct(id:string):void{
  this._CartService.deleteProductFromCart(id).subscribe({
   next:(res)=>{
 console.log(res);
 this.cartDetails=res.data
 this._CartService.cartNumber.next(res.numOfCartItems)
   },
   error:(err)=>{
     console.log(err);
     
   }
  })
 }
updateCount(id:string , count:number):void{
if(count>0){
  this._CartService.updateProductQuantity(id , count).subscribe({
    next:(res)=>{
  console.log(res);
  this.cartDetails=res.data
  this._CartService.cartNumber.next(res.numOfCartItem)
    },
    error:(err)=>{
  console.log(err);
  
    }
 
  })
}
else{
  this.deleteProduct(id)
}
}
clearCart():void{
  this._CartService.clearUserCart().subscribe({
    next:(res)=>{
console.log(res);
if(res.message === "success"){
  this.cartDetails={} as ICart
  this._CartService.cartNumber.next(0)
  this._ToastrService.warning('All Product remove from cart','Clear Cart')
}

    },
    error:(err)=>{
console.log(err);

    }
  })
}
}
