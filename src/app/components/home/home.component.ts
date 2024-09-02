import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService=inject(ProductsService)

  productList:IProduct[]=[]
ngOnInit(): void {
this._ProductsService.getAllProduct().subscribe({
  next:(res)=>{
console.log(res.data);
this.productList=res.data

  },
  error:(err)=>{
console.log(err);

  }
})
}
}
