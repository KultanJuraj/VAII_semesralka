import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardsService } from '../cards';
import { CardI } from '../interfaces/card';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { VersionDialog } from '../version-dialog/version-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-card',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatAnchor],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  card:CardI | undefined;

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog, 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      const id = Number(params.get('id'));
      this.get(id);
    })
  }

  get(id:number):void {
     if (id) {
        this.cardsService.getCard(id).subscribe(card => {this.card = card, this.cdRef.detectChanges()});
      }
  }

  openVersionsDialog(): void {
    if (!this.card) { return; }

    const ref = this.dialog.open(VersionDialog, {
      width: '90vw',
      maxWidth: '2000px',
      maxHeight: '80vh',
      data: { card: this.card }
    });

    ref.afterClosed().subscribe(result => {

      if (result) {
        console.log('Version dialog closed with', result);
      }
    });
  }

}