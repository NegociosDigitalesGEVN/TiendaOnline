import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { error } from 'console';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)]],
    confirmPassword: ['', [Validators.required]]
  },{
    validator: passwordMatchValidator
  });

  constructor(private fb:FormBuilder, 
    private auth: AuthService, 
    private router: Router, 
    private mensaje: MessageService){

  };

  get name(){
    return this.registerForm.controls['name']
  }

  get email(){
    return this.registerForm.controls['email'];
  }

  get password(){
    return this.registerForm.controls['password'];
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword']
  }
  
  enviarRegistro(){
    const data = {...this.registerForm.value}

    delete data.confirmPassword
    
    this.auth.registerUser(data as User).subscribe(
      response => console.log(response), 
      error => console.log(error)
    )
  }

}
