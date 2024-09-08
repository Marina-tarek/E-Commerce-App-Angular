import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/service/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit,OnDestroy{
private readonly _OrdersService=inject(OrdersService)
private readonly _ActivatedRoute=inject(ActivatedRoute)


orderForm:FormGroup =new FormGroup({
    details: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,Validators.required)
})

 cartId:string|null = "";
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
 
     this.cartId= params.get('id')
      console.log(this.cartId);
      
        },
        error:(err)=>{
      console.log(err);
      
        }
  })
}
ngOnDestroy(): void {
  
}
orderSubmit():void{
console.log(this.orderForm.value);
this._OrdersService.checkOut(this.cartId, this.orderForm.value).subscribe({
  next:(res)=>{
    console.log(res);
if(res.status == "success"){

window.open(res.session.url,'_self')
}
      },
      error:(err)=>{
    console.log(err);
    
      }
})
}
}
