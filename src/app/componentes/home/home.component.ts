import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  logOutForm = this.fb.group({})
  
  constructor(private fb:FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router){


  };



 logOut(){
  sessionStorage.clear();
  this.router.navigate(['login']);
  this.messageService.add({ severity: 'info', summary: 'Hasta pronto', detail: 'A cerrado sesión correctamente' });
 }
}
