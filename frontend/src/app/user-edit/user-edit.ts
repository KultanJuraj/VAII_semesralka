import { Component } from '@angular/core';
import { UserService } from '../user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserI } from '../interfaces/userI';
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {

  currUser!: UserI;
  editedUser!: UserI;
  private id = 0;


  profile = {
    userId: 0,
    username: '',
    email: '',
    rating: 0.0,
    admin: false
  };


  edit: { username: boolean; email: boolean } = {
    username: false,
    email: false
  };

 
  private USERNAME_RE = /^[A-Za-z0-9_]+$/;
  private EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  usernameError: string | null = null;
  emailError: string | null = null;

  usernameTouched = false;
  emailTouched = false;
  attemptedSave = false;

  submitting = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.userService.getLoggedUser().subscribe({
        next: (u) => {
          this.currUser = u;
          if (this.currUser?.admin) {
            this.userService.getUserForEdit(this.currUser.userId, this.id).subscribe({
              next: (user) => {
                this.editedUser = user;
                this.profile = {
                  userId: user.userId,
                  username: user.username,
                  email: user.email,
                  rating: user.rating ?? 0.0,
                  admin: !!user.admin
                };
              },
              error: (err) => {
                console.error('getUserForEdit failed', err);
                this.snack.open('Failed to load user', 'OK', { duration: 2000 });
                this.router.navigateByUrl('/home');
              }
            });
          } else {
            this.router.navigateByUrl('/home');
          }
        },
        error: (err) => {
          console.error('getLoggedUser failed', err);
          this.router.navigateByUrl('/home');
        }
      });
    });
  }

  onUsernameInput(value: any): void {
    this.profile.username = value ?? '';
    this.validateUsername();
  }
  onUsernameBlur(): void {
    this.usernameTouched = true;
    this.validateUsername();
  }

  onEmailInput(value: any): void {
    this.profile.email = value ?? '';
    this.validateEmail();
  }
  onEmailBlur(): void {
    this.emailTouched = true;
    this.validateEmail();
  }

  private validateUsername(): void {
    const v = (this.profile.username ?? '').trim();
    this.usernameError = null;
    if (!v) { this.usernameError = 'Username is required.'; return; }
    if (v.length < 3) { this.usernameError = 'Username must be at least 3 characters.'; return; }
    if (v.length > 20) { this.usernameError = 'Username must be at most 20 characters.'; return; }
    if (!this.USERNAME_RE.test(v)) { this.usernameError = 'Only letters, numbers and underscore are allowed.'; }
  }

  private validateEmail(): void {
    const v = (this.profile.email ?? '').trim();
    this.emailError = null;
    if (!v) { this.emailError = 'Email is required.'; return; }
    if (!this.EMAIL_RE.test(v)) { this.emailError = 'Invalid email format.'; }
  }

  toggleEdit(field: keyof typeof this.edit): void {
    if (this.edit[field]) {
      if (field === 'username') {
        this.validateUsername();
        this.usernameTouched = true;
        if (this.usernameError) return; 
        if (this.editedUser) this.editedUser.username = this.profile.username;
      } else if (field === 'email') {
        this.validateEmail();
        this.emailTouched = true;
        if (this.emailError) return;
        if (this.editedUser) this.editedUser.email = this.profile.email;
      }
    }
    this.edit[field] = !this.edit[field];
  }

  saveAll(form?: NgForm): void {
    this.attemptedSave = true;
    this.validateUsername();
    this.validateEmail();

    if (form) form.control.markAllAsTouched();

    if (this.usernameError) {
      this.snack.open(this.usernameError, 'OK', { duration: 2500 });
      return;
    }
    if (this.emailError) {
      this.snack.open(this.emailError, 'OK', { duration: 2500 });
      return;
    }

    if (!this.editedUser || !this.editedUser.userId) {
      this.snack.open('No user loaded', 'OK', { duration: 2000 });
      return;
    }

    this.submitting = true;
    this.editedUser.username = this.profile.username;
    this.editedUser.email = this.profile.email;

    this.userService.updateUser(this.editedUser.userId, this.editedUser).subscribe({
      next: () => {
        this.submitting = false;
        this.snack.open('User updated', 'OK', { duration: 1500 });
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.submitting = false;
        console.error('updateUser failed', err);
        this.snack.open('Failed to update user', 'OK', { duration: 2500 });
      }
    });
  }

  deleteProfile(): void {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    if (!this.editedUser || !this.editedUser.userId) return;
    this.userService.deleteUser(this.editedUser).subscribe({
      next: () => {
        this.snack.open('User deleted', 'OK', { duration: 1500 });
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('deleteUser failed', err);
        this.snack.open('Delete failed', 'OK', { duration: 2500 });
      }
    });
  }

  back(): void {
    this.location.back();
  }
}