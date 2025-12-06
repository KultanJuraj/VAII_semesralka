import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Homepage } from "./homepage/homepage";
import { Cards } from "./cards/cards";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Homepage, Cards],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
