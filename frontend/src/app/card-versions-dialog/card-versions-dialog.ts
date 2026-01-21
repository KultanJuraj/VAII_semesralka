import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardsService } from '../cards';
import { CardVersion,CardI } from '../interfaces/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-card-versions-dialog',
  standalone: true,
  imports: [MatCard, MatButton, MatDialogActions],
  templateUrl: './card-versions-dialog.html',
  styleUrls: ['./card-versions-dialog.css']
})
export class CardVersionsDialog implements OnInit {
  versions: CardVersion[] = [];
  loading = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { cardId: number },
    private dialogRef: MatDialogRef<CardVersionsDialog>,
    private cardsService: CardsService
  ) {}

  ngOnInit() {
    this.loadVersions();
  }

  private loadVersions() {
    var cardsV:CardI|undefined;
    this.loading = true;
    this.cardsService.getCard(this.data.cardId).subscribe(card=>{
      cardsV = card, this.versions = cardsV.versions, this.cdRef.detectChanges(),
      console.log(this.versions[0].id)
    })
  }

  choose(version: CardVersion) {
    this.dialogRef.close(version);
  }

  cancel() {
    this.dialogRef.close(undefined);
  }
}