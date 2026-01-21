import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../cards';
import { CollectionsService } from '../collections';
import { MatDialog } from '@angular/material/dialog';
import { CardVersionsDialog } from '../card-versions-dialog/card-versions-dialog';
import { CardI } from '../interfaces/card';
import { ChangeDetectorRef } from '@angular/core';

import { FormControl, FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatLabel } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-browser',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatInput,
    MatCard,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './card-browser.html',
  styleUrls: ['./card-browser.css']
})
export class CardBrowser {
  cards: CardI[] = [];
  filteredCards: CardI[] | undefined;
  searchControl:FormControl = new FormControl('');
  collectionId: number | undefined;

  constructor(
    private cardsService: CardsService,
    private collectionsService: CollectionsService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id) && id > 0) {
        this.collectionId = id;
      }
    });

    this.get();

    this.searchControl.valueChanges.subscribe(value => {
      const term = (value ?? '').trim().toLowerCase();
      if (!term) {
        this.filteredCards = this.cards;
      } else {
        this.filteredCards = this.cards.filter(c => (c.name ?? '').toLowerCase().includes(term));
      }
    });
  }

  get(): void {
    this.cardsService.getCards().subscribe(cards => {
      this.cards = cards;
      this.filteredCards = cards;
      this.cdRef.detectChanges();
    });
  }

  async openVersionsForCard(card: CardI) {
    const dialogRef = this.dialog.open(CardVersionsDialog, {
      width: '90vw',
      maxWidth: '2000px',
      maxHeight: '80vh',
      data: { cardId: card.id }
    });

    const chosen = await dialogRef.afterClosed().toPromise();

    if (!this.collectionId) {

      console.warn('collectionId not set — cannot add version to collection');
      return;
    }


    this.collectionsService.addVersionToCollection(this.collectionId, chosen.id).subscribe({
      next: (updatedCollection) => {

        console.log('Added version to collection, updatedCollection:', updatedCollection);
      },
      error: (err) => {
        console.error('Failed to add version to collection', err);
      }
    });
  }

  back():void{
    this.location.back();
  }
}