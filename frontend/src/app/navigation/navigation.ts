import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { MatButton } from '@angular/material/button';
import { UserService } from '../user';
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

    constructor(public userservice:UserService) {}

    logout():void{
      this.userservice.logout();
    
    }
}
