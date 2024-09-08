import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/service/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy{
private readonly _BrandsService=inject(BrandsService)


brandList:IBrand[]=[]
ngOnInit(): void {
  this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
console.log(res.data);
this.brandList=res.data

    }
  })
}
ngOnDestroy(): void {
  
}


}
