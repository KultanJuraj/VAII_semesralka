import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CollectionsService } from '../collections';
import { CollectionI } from '../interfaces/collection';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatLabel } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatInput } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCheckbox } from "@angular/material/checkbox";
import { Location } from '@angular/common';
import { MatError } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-collection',
  imports: [MatButton, RouterLink, MatCard, MatCardContent, MatLabel, MatFormField, MatInput, FormsModule, MatCheckbox, MatError],
  templateUrl: './edit-collection.html',
  styleUrl: './edit-collection.css',
})
export class EditCollection {
  collection:CollectionI|undefined;
  id:number = 0;
  private NAME_REGEX = /^[A-Za-z0-9 _-]+$/;
nameError: string | null = null;
  constructor(private collectionService:CollectionsService, private route: ActivatedRoute,
    private router:Router,
    private location:Location,
    private snack:MatSnackBar
    
  ){}
  
  collectionE = {
    name:'',
    publicity:true
  }


  ngOnInit(){
    this.route.paramMap.subscribe(params=> {
      this.id = Number(params.get('id'));
      console.log(this.id);
      this.getCollectionById(this.id);
    })
  }

  
    

  delete():void{
    this.collectionService.deleteCollection(this.id).subscribe({});
  }
  getCollectionById(id:number){
    this.collectionService.getCollection(id).subscribe(collection => {this.collection = collection, this.collectionE.name = this.collection.name,
      this.collectionE.publicity = this.collection.publicity
    })
  }

  edit: { name: boolean} = {
  name: false,
  };

  toggleEdit(field: keyof typeof this.edit, form?: any) {
  if (this.edit[field]) {
    if (field === 'name') {
      this.validateName();
      if (this.nameError) return;
    }
  }
  this.edit[field] = !this.edit[field];
}

private validateName() {
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
  if (!this.NAME_REGEX.test(v)) {
    this.nameError = 'Only letters, numbers, spaces, underscores and hyphens are allowed.';
  }
}


  saveAll(form?: NgForm): void {
    if (form) {
      if (form.invalid) {
        form.control.markAllAsTouched();
        return;
      }
    } else {
      if (!this.collectionE.name || this.collectionE.name.trim().length < 3) {
        this.snack.open('Validation failed: name too short or missing', 'OK', {duration: 2000});
        return;
      }
    }
    if(this.nameError) {
      this.snack.open(this.nameError, 'OK', { duration: 2500 });
      return;
    }

    if (this.collection) {
      this.collection.name = this.collectionE.name;
      this.collection.publicity = this.collectionE.publicity;

      this.collectionService.updateCollection(this.id, this.collection).subscribe({
        next: () => {
          this.snack.open('Collection updated', 'OK', { duration: 2000 });
          this.router.navigateByUrl("collections")
        },
        error: err => this.snack.open("Editing failed", 'OK', {duration: 2000})
      });
    }
  }

  back():void{
    this.location.back();
  }

  onNameInput(value: string) {
    this.collectionE.name = value;
    this.validateName();
  }
  
}