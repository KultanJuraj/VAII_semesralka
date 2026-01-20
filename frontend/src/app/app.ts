import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Navigation } from "./navigation/navigation";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { MatButton } from '@angular/material/button';
import { UserService } from './user';
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, MatButton, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  constructor(public userservice:UserService) {}
  logout():void{
      this.userservice.logout();
    
    }
}
