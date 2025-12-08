import { Component } from '@angular/core';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/input';
import { FormBuilder } from '@angular/forms';
import { passwordMatchValidator } from './validator';


@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule,MatLabel,MatCardModule, ReactiveFormsModule, MatButtonModule,
    MatInputModule, MatError
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    registerGroup!: FormGroup;


  constructor( private userService:UserService, private readonly router: Router,
    private fb: FormBuilder
  ) {

  }

checkStrength(password: string): string {
  if (!password) return '';
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) return 'Weak';
  if (strength === 2) return 'Medium';
  return 'Strong';
}

  ngOnInit(): void {
    this.registerGroup = this.fb.group({
     username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9_]+$')]],
   email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', Validators.required]
}, { validators: passwordMatchValidator() });
  }

  


  register(): void {
    if(this.registerGroup.valid){
     const username = this.registerGroup.value.username ?? '';
      const password = this.registerGroup.value.password ?? '';
      const email = this.registerGroup.value.email ?? '';
      this.userService.register(username,password,email,0.0)
      .subscribe(()=> {
        this.userService.login(username,password)
        .subscribe(()=> this.router.navigateByUrl('home'));
      });}
  
    }

}
