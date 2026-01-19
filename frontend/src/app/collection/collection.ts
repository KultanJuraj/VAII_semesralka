import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionsService } from '../collections';
import { CollectionI } from '../interfaces/collection';
import { CardI, CardVersion } from '../interfaces/card';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-collection',
  imports: [],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection {
  collection:CollectionI|undefined;

  constructor(private route: ActivatedRoute, private collectionService:CollectionsService,
    private cdRef: ChangeDetectorRef,
  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      const id = Number(params.get('id'));
      this.get(id);
    })

  }

  get(id:number):void {
    this.collectionService.getCollection(id).subscribe(collection => {this.collection = collection,  this.cdRef.detectChanges()})
  }

}
