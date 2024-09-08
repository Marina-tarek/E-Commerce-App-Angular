import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './core/gaurds/auth.guard';
import { loginGuard } from './core/gaurds/login.guard';
import { DetailesComponent } from './components/detailes/detailes.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    // {path:'',redirectTo:"home",pathMatch:'full'}
    // routing between two navbar

    {path:'',component:AuthLayoutComponent,canActivate:[loginGuard],children:[
        {path:'',redirectTo:"login",pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'forgetPassword',component:ForgetPasswordComponent}
    ]},
    {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:"home",pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path:'products',component:ProductComponent},
        {path:'categories',component:CategoriesComponent},
        {path:'brands',component:BrandsComponent},
        {path:'details/:id',component:DetailesComponent},
        {path:'cart',component:CartComponent},
        {path:'wishlist',component:WishlistComponent},
        {path:'allorders',component:AllordersComponent},
        {path:'orders/:id',component:OrdersComponent}

    ]},
    {path:'**',component:NotfoundComponent}
];
