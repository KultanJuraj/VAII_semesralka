import { Component, Version } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { Card } from "../card/card";
import { Cards } from '../cards/cards';


@Component({
  selector: 'app-homepage',
  imports: [MatCard, CommonModule, Cards],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
 constructor() {}

}
