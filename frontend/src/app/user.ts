import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserI } from './interfaces/userI';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = "http://localhost:8080";
  token: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor(private readonly http: HttpClient, private readonly router: Router) {

  }

  getToken(): string{
    return this.token.getValue();
  }

  isLoggedin():boolean {
    return !!this.getToken();
  }

  login(username: string, password: string): Observable<any>{
    const info = btoa(`${username}:${password}`);
    const token = `Basic ${info}`;
    const options = {
    headers : new HttpHeaders({
      Authorization: token,
      'X-Requested-With': 'XMLHttpRequest'
    }),
    withCredentials : true
    };
    return this.http.get(`${this.userUrl}/user`, options).pipe(
      tap(()=>this.token.next(token))
    );
 }
    register(username: string, password:string, email:string, rating: number): Observable<any> {
      var admin = false;
      const user = {username, email, password, rating, admin};
      return this.http.post(`${this.userUrl}/postUser`,user);
    }

    logout():void {
      this.token = new BehaviorSubject("");
      this.router.navigateByUrl('login');
    }


    updateUser(id:number,user: UserI):Observable<any> {
      return this.http.put(`${this.userUrl}/putUser/${id}`, user);
    }

    getLoggedUser(): Observable<UserI> {
  return this.http.get<UserI>(`${this.userUrl}/userLogged`);
  }

    deleteUser(user:UserI): Observable<any> {
      return this.http.delete(`${this.userUrl}/deleteUser/${user.userId}`);
  }

  getUsers(id:number):Observable<UserI[]> {
    return this.http.get<UserI[]>(`${this.userUrl}/users/${id}`);
  }
  
  getUserForEdit(editingId:number, editedId:number):Observable<UserI> {
    return this.http.get<UserI>(`${this.userUrl}/${editingId}/${editedId}`);
  }
}