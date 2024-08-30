import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
// inject
private readonly _AuthService=inject(AuthService)
private readonly _FormBuilder =inject(FormBuilder)
private readonly _Router =inject(Router)

// validator{}--<method Validation
msgError:string ="";
isLoading:boolean =false;
msgSuccess:boolean=false

loginForm:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
})



loginSubmit():void{

if (this.loginForm.valid) {
 this.isLoading=true
  this._AuthService.setloginForm(this.loginForm.value).subscribe({
    
    next:(res)=>{
console.log(res);
if(res.message == 'success'){
  this.msgSuccess=true
  setTimeout(() => {
    this._Router.navigate(['/home'])
  }, 2000);
}
this.isLoading=false;
    },
    error:(err:HttpErrorResponse)=>{
      this.msgError = err.error.message
console.log(err);
this.isLoading=false;
    }
  });
  
  
  
}else{
  this.loginForm.setErrors({mismatch:true})
  this.loginForm.markAllAsTouched()
}
  
 }
}
