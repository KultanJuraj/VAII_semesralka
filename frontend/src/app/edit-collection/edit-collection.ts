import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CollectionsService } from '../collections';
import { CollectionI } from '../interfaces/collection';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatLabel } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'app-edit-collection',
  imports: [MatButton, RouterLink, MatCard, MatCardContent, MatLabel, MatFormField, MatInput, FormsModule, MatCheckbox],
  templateUrl: './edit-collection.html',
  styleUrl: './edit-collection.css',
})
export class EditCollection {
  collection:CollectionI|undefined;
  id:number = 0;
  constructor(private collectionService:CollectionsService, private route: ActivatedRoute){}
  
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

  toggleEdit(field: keyof typeof this.edit) {
    this.edit[field] = !this.edit[field];
  }


  saveAll(): void{
    if(this.collection && this.collection.id) {
    this.collection.name = this.collectionE.name;
    this.collection.publicity = this.collectionE.publicity;
    this.collectionService.updateCollection(this.id, this.collection).subscribe(collections=>{console.log("collection updated")})
    }

  }
}