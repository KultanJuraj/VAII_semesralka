import { Component } from '@angular/core';
import { UserService } from '../user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserI } from '../interfaces/userI';
import { RouterLink, ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, RouterLink],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {

  currUser!:UserI;
  editedUser!:UserI;
  private id:number = 0;
  constructor(private userService: UserService, private router:Router,
    private route: ActivatedRoute
  ) {
  
  }
  profile = {
  userId:0,
  username: '',
  email: '',
  rating:0.0,
  admin:false
}
ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.id = Number(params.get('id'));
      this.userService.getLoggedUser().subscribe(user=>{this.currUser = user
        if(this.currUser.admin) {
        this.userService.getUserForEdit(this.currUser.userId, this.id).subscribe(user =>
          {this.editedUser = user, this.profile = user, console.log(this.editedUser.userId)})
        } else {
          this.router.navigateByUrl('/home');
        }
      }

      )
    })
  }



  edit: { username: boolean; email: boolean} = {
  username: false,
  email: false,
  };

   toggleEdit(field: keyof typeof this.edit) {
    this.edit[field] = !this.edit[field];
  }


  saveAll(): void{
    if(this.editedUser && this.editedUser.userId) {
    this.editedUser.username = this.profile.username;
    this.editedUser.email = this.profile.email;
    this.userService.updateUser(this.profile.userId, this.editedUser).subscribe(()=>this.router.navigateByUrl('/home'))
    }
}

  deleteProfile():void {
    if(this.currUser){
      this.userService.deleteUser(this.currUser).subscribe(()=>this.userService.logout())
    }
  }
}
