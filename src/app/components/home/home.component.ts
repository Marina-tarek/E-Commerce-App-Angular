import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/service/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {  UpperCasePipe } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { WishlistService } from '../../core/service/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,UpperCasePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _CartService=inject(CartService);
  private readonly _WishlistService=inject(WishlistService);
  private readonly _ToastrService=inject(ToastrService);
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _AuthService=inject(AuthService)


  productList:IProduct[]=[]
  categoriesList:ICategory[]=[]
  getAllProductSub !: Subscription


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
 items:1,
    nav: true
  }
  customOptionsCategory: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 7
      }
    },
    nav: false
  }
  
ngOnInit(): void {
this.getAllProductSub=this._ProductsService.getAllProduct().subscribe({
  next:(res)=>{
console.log(res.data);
this.productList=res.data

  },
  error:(err)=>{
console.log(err);

  }
})

this._CategoriesService.getAllCategories().subscribe({
  next:(res)=>{
console.log(res.data);
this.categoriesList=res.data

  },
  error:(err)=>{
alert(err)

  }
})
}


 ngOnDestroy(): void {
// unsubscribe
  this.getAllProductSub?.unsubscribe()
 }

 addProductInCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
     this._ToastrService.success(res.message,'Fresh Cart')
      this._CartService.cartNumber.next(res.numOfCartItems)
      console.log(this._CartService.cartNumber);
      
        },
        error:(err)=>{
      alert(err)
      
        } 
  })
}

wishList:boolean=false

 addFavouriteProduct(id:string):void{
  this._WishlistService.addToWishlist(id).subscribe({
    next:(res)=>{
      let itemId=id
      console.log(res.data);
       if(res.status === 'success'){
     
this.wishList=true
this._AuthService.saveUserData()
this._ToastrService.success(res.message,'Add into Wishlist')
   }else{
    this.wishList=false
   }
    
      },
      error:(err)=>{
    alert(err)
    
      } 
})
 }
 removeFromFavoriteList(id:string):void{
  this._WishlistService.deleteFromWishlist(id).subscribe({
    next:(res)=>{
this.wishList=false
this._AuthService.saveUserData()
    },
    error:(err)=>{
console.log(err);

    }
  })
 }
}
