import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionsService } from '../collections';
import { CollectionI } from '../interfaces/collection';
import { CardVersion } from '../interfaces/card';
import { ChangeDetectorRef } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-collection',
  imports: [MatCard,MatButton,RouterLink],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection {
  collection:CollectionI|undefined;
  cardVersions:CardVersion[] = [];
  removeFlag:boolean = false;
  colleId!:number;

  constructor(private route: ActivatedRoute, private collectionService:CollectionsService,
    private cdRef: ChangeDetectorRef, private location:Location
  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.colleId = Number(params.get('id'));
      this.get(this.colleId);
    })

  }

  get(id:number):void {
    this.collectionService.getCollection(id).subscribe(collection => {this.collection = collection, 
       this.cdRef.detectChanges(), console.log(this.collection.items[0].cardVersion.image)
    })
  }

  changeRFlag():void{
    if(this.removeFlag){ this.removeFlag = false}
    else {this.removeFlag = true};
    this.cdRef.detectChanges();
  }

  remove(id:number):void{
    this.collectionService.removeVersion(this.colleId, id).subscribe(() => {
      this.collection!.items = this.collection!.items.filter(v=>v.cardVersion.id!=id);
      this.cdRef.detectChanges();
    });
  }
  back():void {
    this.location.back();
  }
}