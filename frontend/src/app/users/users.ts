import { Component } from '@angular/core';
import { UserService } from '../user';
import { UserI} from '../interfaces/userI';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  users:UserI[] = [];
  constructor(private userService:UserService) {}


  
}
