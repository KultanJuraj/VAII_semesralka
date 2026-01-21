import { Component } from '@angular/core';
import { UserService } from '../user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserI } from '../interfaces/userI';
import { RouterLink, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  currUser!: UserI;
  private id: number = 0;

  profile = {
    userId: 0,
    username: '',
    email: '',
    rating: 0.0
  };

  edit: { username: boolean; email: boolean } = {
    username: false,
    email: false,
  };

  usernameError: string | null = null;
  emailError: string | null = null;

  usernameTouched = false;
  emailTouched = false;
  attemptedSave = false;

  private USERNAME_RE = /^[A-Za-z0-9_]{3,20}$/;
  private EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private userService: UserService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.getLoggedUser().subscribe({
      next: (user) => {
        if (!user) return;
        this.currUser = user;
        this.id = user.userId;
        this.profile = {
          userId: user.userId,
          username: user.username,
          email: user.email,
          rating: user.rating ?? 0.0
        };
      },
      error: (err) => console.error('Failed to load logged user', err)
    });
  }

  onUsernameInput(value: string) {
    this.profile.username = value;
    this.validateUsername();
  }
  onUsernameBlur() {
    this.usernameTouched = true;
    this.validateUsername();
  }

  onEmailInput(value: string) {
    this.profile.email = value;
    this.validateEmail();
  }
  onEmailBlur() {
    this.emailTouched = true;
    this.validateEmail();
  }

  private validateUsername() {
    const v = (this.profile.username ?? '').trim();
    this.usernameError = null;
    if (!v) {
      this.usernameError = 'Username is required.';
      return;
    }
    if (v.length < 3) {
      this.usernameError = 'Username must be at least 3 characters.';
      return;
    }
    if (v.length > 20) {
      this.usernameError = 'Username must be at most 20 characters.';
      return;
    }
    if (!/^[A-Za-z0-9_]+$/.test(v)) {
      this.usernameError = 'Only letters, numbers and underscores allowed.';
      return;
    }
  }

  private validateEmail() {
    const v = (this.profile.email ?? '').trim();
    this.emailError = null;
    if (!v) {
      this.emailError = 'Email is required.';
      return;
    }
    if (!this.EMAIL_RE.test(v)) {
      this.emailError = 'Invalid email format.';
    }
  }
  toggleEdit(field: keyof typeof this.edit) {
    if (this.edit[field]) {
      if (field === 'username') {
        this.usernameTouched = true;
        this.validateUsername();
        if (this.usernameError) return;
        if (this.currUser) this.currUser.username = this.profile.username;
      } else if (field === 'email') {
        this.emailTouched = true;
        this.validateEmail();
        if (this.emailError) return;
        if (this.currUser) this.currUser.email = this.profile.email;
      }
    }
    this.edit[field] = !this.edit[field];

    if (this.edit[field]) {
      if (field === 'username') this.profile.username = this.currUser?.username ?? this.profile.username;
      if (field === 'email') this.profile.email = this.currUser?.email ?? this.profile.email;
    }
  }

  saveAll(): void {
    this.attemptedSave = true;
    this.usernameTouched = true;
    this.emailTouched = true;

    this.validateUsername();
    this.validateEmail();

    if (this.usernameError || this.emailError) {
      const msg = this.usernameError ?? this.emailError ?? 'Validation failed';
      this.snack.open(msg, 'OK', { duration: 2500 });
      return;
    }

    if (this.currUser && this.currUser.userId) {
      this.currUser.username = this.profile.username;
      this.currUser.email = this.profile.email;

      this.userService.updateUser(this.currUser.userId, this.currUser).subscribe({
        next: () => {
          this.snack.open('Profile updated', 'OK', { duration: 2000 });
          this.edit.username = false;
          this.edit.email = false;
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          console.error('update failed', err);
          this.snack.open('Update failed', 'OK', { duration: 2000 });
        }
      });
    }
  }

  deleteProfile(): void {
    if (!this.currUser) return;
    if (!confirm('Delete your profile? This action cannot be undone.')) return;

    this.userService.deleteUser(this.currUser).subscribe({
      next: () => {
        this.snack.open('Profile deleted', 'OK', { duration: 2000 });
        this.userService.logout();
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.snack.open('Delete failed', 'OK', { duration: 2000 });
      }
    });
  }
}