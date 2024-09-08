import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/service/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailes',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detailes.component.html',
  styleUrl: './detailes.component.scss',
})
export class DetailesComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  productDetails: IProduct | null = null;
  getSpecificProductSub!: Subscription;

  customOptionsProductImag: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
        this.getSpecificProductSub = this._ProductsService
          .getSpecificProduct(idProduct)
          .subscribe({
            next: (res) => {
              console.log(res.data);
              this.productDetails = res.data;
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    // unsubscribe
    this.getSpecificProductSub?.unsubscribe();
  }
  

  addProductToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message,'Fresh Cart')
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
