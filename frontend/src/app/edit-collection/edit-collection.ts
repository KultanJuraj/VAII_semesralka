import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CollectionsService } from '../collections';
import { CollectionI } from '../interfaces/collection';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-collection',
  imports: [MatButton, RouterLink],
  templateUrl: './edit-collection.html',
  styleUrl: './edit-collection.css',
})
export class EditCollection {
  collection:CollectionI|undefined;
  id:number = 0;
  constructor(private collectionService:CollectionsService, private route: ActivatedRoute){}

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
    this.collectionService.getCollection(id).subscribe(collection => {this.collection = collection})
  }

}