import { Component } from '@angular/core';
import { CollectionI } from '../interfaces/collection';
import { CollectionsService } from '../collections';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-public-collections',
  imports: [MatCard,RouterLink],
  templateUrl: './public-collections.html',
  styleUrl: './public-collections.css',
})
export class PublicCollections {
  collections:CollectionI[] = []

  constructor(private collectionService:CollectionsService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getCollections();
  }

  getCollections():void{
    this.collectionService.getPublicCollections().subscribe(collecions => {this.collections = collecions, this.cdRef.detectChanges()})
  }

}
