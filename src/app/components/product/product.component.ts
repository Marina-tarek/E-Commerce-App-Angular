import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/service/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy{
private readonly _ProductsService=inject(ProductsService)
private readonly _ToastrService=inject(ToastrService)

productList:IProduct[]=[]
productSub!:Subscription
ngOnInit(): void {
  this._ProductsService.getAllProduct().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productList=res.data
    }
  })
}
ngOnDestroy(): void {
  this.productSub?.unsubscribe()
}

addProductInCart(id:string):void{
  this._ProductsService.getAllProduct().subscribe({
    next:(res)=>{
      console.log(res);
     this._ToastrService.success(res.message,'Fresh Cart')
      
        },
        error:(err)=>{
      alert(err)
      
        } 
  })
}
}
