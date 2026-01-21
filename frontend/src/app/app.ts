import { Component, signal } from '@angular/core';
import { RouterOutlet,  } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { MatButton } from '@angular/material/button';
import { UserService } from './user';
import { MatSidenavModule } from '@angular/material/sidenav'
import { UserI } from './interfaces/userI';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, MatButton, MatSidenavModule,
    MatIcon
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loggedUser:UserI|undefined;
  protected readonly title = signal('frontend');
  constructor(public userservice:UserService, private cdRef: ChangeDetectorRef) {}
  
  logout():void{
    this.userservice.logout();
    }

    getLoggedUser(user:UserI):void {
      this.loggedUser = user;
    }
}
