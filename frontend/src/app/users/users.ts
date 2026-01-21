import { Component } from '@angular/core';
import { UserService } from '../user';
import { UserI } from '../interfaces/userI';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-users',
  imports: [RouterLink, MatButton, MatCard],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  loggedUser:UserI|undefined;
  users:UserI[] = [];
  removeFlag:boolean = false;
  constructor(private userService:UserService, private cdRef: ChangeDetectorRef,
    private location:Location
  ) {}

  ngOnInit() {
  this.getLoggedUser();
  }


  
  getLoggedUser():void {
      this.userService.getLoggedUser().subscribe(user => {this.loggedUser = user, this.cdRef.detectChanges(),
        console.log(user.admin),
        this.getUsers()
      });
    }
  getUsers():void{
    
    if(this.loggedUser?.admin) {
    this.userService.getUsers(this.loggedUser.userId).subscribe(users => {this.users = users, this.cdRef.detectChanges(),console.log(this.users[0].username)});
  } 
  else {
    this.location.back()
  }

  }

  deleteUser(user:UserI) {
    this.userService.deleteUser(user).subscribe(()=>{this.users = this.users.filter(u=>user!=user);
      this.cdRef.detectChanges();
    })
  }

   changeRFlag():void{
    if(this.removeFlag){ this.removeFlag = false}
    else {this.removeFlag = true};
    this.cdRef.detectChanges();
  }
}
