import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/service/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {
private readonly _CategoriesService=inject(CategoriesService)


categoriesList:ICategory[]=[]
ngOnInit(): void {
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
console.log(res);
this.categoriesList=res.data
    },
    error:(err)=>{
console.log(err);

    }
  })
}
ngOnDestroy(): void {
  
}
}
