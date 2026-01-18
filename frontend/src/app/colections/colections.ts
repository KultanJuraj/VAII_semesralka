import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { CollectionI } from '../interfaces/collection';
import { CollectionsService } from '../collections';
import { UserService } from '../user';
import { UserI } from '../interfaces/userI';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-colections',
  imports: [MatCard, CommonModule, MatButton, RouterLink],
  templateUrl: './colections.html',
  styleUrl: './colections.css',
})
export class Colections {
  collections:CollectionI[] = [];
  user!:UserI;
  constructor(private collectionService:CollectionsService, private userService:UserService, private cdRef: ChangeDetectorRef,){}


  ngOnInit() {
    this.getCollections();

  }


  getCollections():void{
    this.userService.getLoggedUser().subscribe(user=>{this.user = user,
    this.collectionService.getCollections(this.user.userId).subscribe(collections => {this.collections = collections, this.cdRef.detectChanges()});
    });
    
    
  }

}
