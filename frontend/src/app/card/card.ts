import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardsService } from '../cards';
import { CardI } from '../interfaces/card';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  card:CardI | undefined;

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      const id = Number(params.get('id'));
      if (id) {
        this.cardsService.getCard(id).subscribe(card => {this.card = card, this.cdRef.detectChanges()});
      }

    })
  }

}
