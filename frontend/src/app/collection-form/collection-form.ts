import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionsService } from '../collections';
import { UserService } from '../user';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-collectio-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule,
    MatCardModule, FormsModule
  ],
  templateUrl: './collection-form.html',
  styleUrl: './collection-form.css',
})
export class CollectionForm {
  collectionE = {
    name: '',
    publicity: true
  };

  edit: { name: boolean } = { name: true };

  userId?: number;

  // submission state
  submitting = false;

  private NAME_RE = /^[A-Za-z0-9 _\-]+$/;
  nameError: string | null = null;
  nameTouched = false;
  attemptedSave = false;

  constructor(
    private collectionService: CollectionsService,
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe({
      next: u => {
        if (u && typeof u.userId === 'number') this.userId = u.userId;
      },
      error: err => {
        console.error('getLoggedUser failed', err);
      }
    });
  }

  onNameInput(value: any): void {
    this.collectionE.name = value ?? '';
    this.validateName();
  }

  onNameBlur(): void {
    this.nameTouched = true;
    this.validateName();
  }

  private validateName(): void {
    const v = (this.collectionE.name ?? '').trim();
    this.nameError = null;

    if (!v) {
      this.nameError = 'Name is required.';
      return;
    }
    if (v.length < 3) {
      this.nameError = 'Name must be at least 3 characters.';
      return;
    }
    if (v.length > 50) {
      this.nameError = 'Name must be at most 50 characters.';
      return;
    }
    if (!this.NAME_RE.test(v)) {
      this.nameError = 'Only letters, numbers, spaces, underscores and hyphens are allowed.';
    }
  }

  toggleEdit(field: keyof typeof this.edit): void {
    if (this.edit[field]) {
      if (field === 'name') {
        this.validateName();
        this.nameTouched = true;
        if (this.nameError) return; 
      }
    }
    this.edit[field] = !this.edit[field];
  }

  back(): void {
    this.location.back();
  }

  saveAll(form?: NgForm): void {
    this.attemptedSave = true;
    this.validateName();

    if (form) form.control.markAllAsTouched();

    if (this.nameError) {
      this.snack.open(this.nameError, 'OK', { duration: 2500 });
      return;
    }

    if (!this.userId) {
      this.snack.open('You must be logged in to create collections', 'OK', { duration: 3000 });
      return;
    }

    this.submitting = true;
    const name = this.collectionE.name.trim();
    const publicity = !!this.collectionE.publicity;

    this.collectionService.createCollectionForUser(this.userId, name, publicity).subscribe({
      next: () => {
        this.submitting = false;
        this.snack.open('Collection created', 'OK', { duration: 1500 });
        this.collectionE.name = '';
        this.collectionE.publicity = true;
        this.router.navigate(['/collections']);
      },
      error: err => {
        this.submitting = false;
        console.error('create collection failed', err);
        this.snack.open('Failed to create collection', 'OK', { duration: 3000 });
      }
    });
  }
}