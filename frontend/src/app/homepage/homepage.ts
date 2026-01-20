import { Component, Version } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homepage',
  imports: [MatCard, CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
 constructor() {}

}
