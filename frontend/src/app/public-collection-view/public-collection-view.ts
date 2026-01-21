import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CollectionI } from '../interfaces/collection';
import { CollectionsService } from '../collections';
import { MatCard } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { CardsService } from '../cards';
import { CardA } from '../interfaces/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-collection-view',
  imports: [MatCard, MatAnchor],
  templateUrl: './public-collection-view.html',
  styleUrl: './public-collection-view.css',
})
export class PublicCollectionView {
  collection!:CollectionI;
  id:number = 0;

  constructor(private route:ActivatedRoute, private collectionsService:CollectionsService,
    private cdRef:ChangeDetectorRef, private location:Location, private cardService:CardsService,
    private router:Router
  ) {}

  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      this.id = Number(params.get('id'));
      this.getPublicCollection();
    })
  }

  getPublicCollection():void {
    this.collectionsService.getPublicCollection(this.id).subscribe(collection=>{this.collection = collection, this.cdRef.detectChanges(),
      console.log(this.collection.id)
    });
  }
  back():void{
    this.location.back();
  }

  card(cardVersionId:number): void {
      var cardV:CardA;
      this.cardService.getCardByVersion(cardVersionId).subscribe(card=>{
      cardV = card
      console.log(cardV.card.id)
      this.router.navigateByUrl('card/' + cardV.card.id)
    })
    }
}
