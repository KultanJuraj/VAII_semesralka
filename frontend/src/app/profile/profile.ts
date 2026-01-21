import { Component } from '@angular/core';
import { UserService } from '../user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserI } from '../interfaces/userI';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  currUser!:UserI;
  private id:number = 0;
  constructor(private userService: UserService,
    private router:Router
  ) {
  
  }
  profile = {
  userId:0,
  username: '',
  email: '',
  rating:0.0
}
ngOnInit() {
    this.userService.getLoggedUser().subscribe(user =>{ this.profile = user, this.currUser = user, this.id = this.currUser.userId});
  }



  edit: { username: boolean; email: boolean} = {
  username: false,
  email: false,
  };

   toggleEdit(field: keyof typeof this.edit) {
    this.edit[field] = !this.edit[field];
  }


  saveAll(): void{
    if(this.currUser && this.currUser.userId) {
    this.currUser.username = this.profile.username;
    this.currUser.email = this.profile.email;
    this.userService.updateUser(this.profile.userId, this.currUser).subscribe(()=>()=>this.router.navigateByUrl('/home'))
    }
}

  deleteProfile():void {
    if(this.currUser){
      this.userService.deleteUser(this.currUser).subscribe(()=>this.userService.logout())
    }
  }
}
