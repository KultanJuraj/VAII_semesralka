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
    return this.http.get("http://localhost:8080/user", options).pipe(
      tap(()=>this.token.next(token))
    );
 }
    register(username: string, password:string, email:string, rating: number): Observable<any> {
      const user = {username, email, password, rating};
      console.log(user);
      return this.http.post("http://localhost:8080/postUser",user);
    }

    logout():void {
      this.token = new BehaviorSubject("");
      this.router.navigateByUrl('login');
    }


    updateUser(id:number,user: UserI):Observable<any> {
      console.log(id);
      return this.http.put(`http://localhost:8080/putUser/${user.userId}`, user);
    }

    getLoggedUser(): Observable<UserI> {
  return this.http.get<UserI>("http://localhost:8080/userLogged");
  }

    deleteUser(user:UserI): Observable<any> {
      return this.http.delete(`http://localhost:8080/deleteUser/${user.userId}`);
    }
 
  
}
