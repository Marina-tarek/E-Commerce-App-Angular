import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
 private readonly _Router= inject(Router)

step:number=1


verificationEmail:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
})



verficationCode:FormGroup=this._FormBuilder.group({
  resetCode:[null,[Validators.required,Validators.pattern(/^\w{6}$/)]],
})


resetPassword:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  newPassword:[null,[Validators.required,Validators.pattern(/^\w{5,}$/)]]
})


verifyEmailSubmit():void{
  let emailValue=this.verificationEmail.get('email')?.value
this.resetPassword.get('email')?.patchValue(emailValue)

this._AuthService.setEmailVerify(this.verificationEmail.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.statusMsg ==='success'){
this.step=2;
    }
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}
verifyCodeSubmit():void{
this._AuthService.setCodeVerify(this.verficationCode.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.status ==='Success'){
this.step=3;
    }
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}
resetPasswordSubmit():void{
this._AuthService.resetNewPassword(this.resetPassword.value).subscribe({
  next:(res)=>{
    console.log(res);
localStorage.setItem('userToken',res.token)
this._AuthService.saveUserData()
this._Router.navigate(['/home'])
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}



}
