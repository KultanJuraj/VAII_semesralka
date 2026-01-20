import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionsService } from '../collections';
import { CollectionI } from '../interfaces/collection';
import { UserService } from '../user';
import { ChangeDetectorRef } from '@angular/core';
import { UserI } from '../interfaces/userI';
import { Router} from "@angular/router";


@Component({
  selector: 'app-collectio-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './collection-form.html',
  styleUrl: './collection-form.css',
})
export class CollectionForm {
  userId!: number;
  form!: FormGroup;

  

  submitting = false;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionsService,
    private snack: MatSnackBar,
    private userService:UserService,
    private router:Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
    name: [''],
    publicity: [false]

  });
  this.getUser();
  }
getUser():void{
  var user!:UserI;
  this.userService.getLoggedUser().subscribe(user =>{user = user, this.userId = user.userId ,console.log(this.userId)})
}

  submit(): void {
    console.log(this.userId);
    const name = (this.form.value.name || '').trim();
    const publicity = !!this.form.value.publicity;

    if (!name) {
      this.snack.open('Please provide a name', 'OK', { duration: 2000 });
      return;
    }

    this.submitting = true;
    this.collectionService.createCollectionForUser(this.userId, name, publicity)
      .subscribe({
        next: col => {
          this.submitting = false;
          this.snack.open('Collection created', 'OK', { duration: 1500 });
          this.form.reset({ name: '', publicity: false });
          this.router.navigate(['/collections']);
        },
        error: err => {
          console.error('create collection failed', err);
          this.submitting = false;
          this.snack.open('Failed to create collection', 'OK', { duration: 2000 });
        }
      });
  }
}