import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user';
import { Router, RouterLink } from '@angular/router';
import { MatCardActions, MatCardContent, MatCard, MatCardTitle } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, RouterLink,
     MatCardActions, MatCardContent, MatCard, MatCardTitle
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginGroup = new FormGroup ({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private userService: UserService,
    private readonly router : Router,
    private snack: MatSnackBar
  ) { }

  login(): void {
    if(this.loginGroup.valid) {
      const username = this.loginGroup.value.username ?? '';
      const password = this.loginGroup.value.password ?? '';
      this.userService.login(username, password).subscribe({
        next: use => {this.router.navigateByUrl('/home')},
        error: err=> {this.snack.open("Failed to log in, wrong username or password", 'Ok', {duration: 2000 })}
      } 
    );
    }
  }

}
