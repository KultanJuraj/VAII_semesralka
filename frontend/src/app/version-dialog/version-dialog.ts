import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardI } from '../interfaces/card';
import { MatCard, MatCardImage } from '@angular/material/card';

@Component({
  selector: 'app-version-dialog',
  templateUrl: './version-dialog.html',
  styleUrls: ['./version-dialog.css'],
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatCard, MatCardImage ],
})
export class VersionDialog {
  card?: CardI;
  versions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { card?: CardI; cardId?: number },
    private dialogRef: MatDialogRef<VersionDialog>
  ) {
    if (data.card) {
      this.card = data.card;
      this.versions = (data.card as any).versions ?? [];
    }
  }

  selectVersion(version: any): void {
    this.dialogRef.close(version);
  }

  close(): void {
    this.dialogRef.close();
  }
}