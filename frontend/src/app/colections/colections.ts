import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { CollectionI } from '../interfaces/collection';
import { CollectionsService } from '../collections';
import { UserService } from '../user';
import { UserI } from '../interfaces/userI';

@Component({
  selector: 'app-colections',
  imports: [MatCard],
  templateUrl: './colections.html',
  styleUrl: './colections.css',
})
export class Colections {
  collections:CollectionI[] = [];
  user:UserI|undefined;
  constructor(private collectionService:CollectionsService, private userService:UserService){}


  ngOnInit() {


  }


  getCollections():void{
    this.userService.getLoggedUser().subscribe(user=>{this.user = user});
    while(!this.user){}
    this.collectionService.getCollections(this.user.userId).subscribe(collections => {this.collections = collections});
  }

}
