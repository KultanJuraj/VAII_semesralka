import { Component } from '@angular/core';
import { CardI } from '../interfaces/card'
import { CardsService } from '../cards'
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-cards',
  imports: [MatCardModule, CommonModule, RouterLink, MatInputModule, MatFormFieldModule, FormsModule,ReactiveFormsModule,
  MatGridListModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  cards:CardI[] = [];
  filteredCards: CardI[]|undefined; 
  searchControl = new FormControl('');

  constructor(private cardsService:CardsService, private cdRef: ChangeDetectorRef,) {
    
  }
  ngOnInit(): void {
    this.get();

    this.searchControl.valueChanges.subscribe(value => {
  const term = value ?? '';
  this.filteredCards = this.cards.filter(c =>
    c.name.toLowerCase().includes(term.toLowerCase())
  );
});
    
  }

  get (): void {
    this.cardsService.getCards().subscribe(cards => {this.cards = cards, this.filteredCards = cards, this.cdRef.detectChanges()});
  }


}