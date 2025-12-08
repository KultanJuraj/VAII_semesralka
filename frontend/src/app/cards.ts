import { Injectable } from '@angular/core';
import {CardI,CardType,ManaValue} from './interfaces/card'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  cardUrl="http://localhost:8080/cards"
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){

  }

  getCards():Observable<CardI[]>{
    return this.http.get<CardI[]>(this.cardUrl);
  }
  getCard(id:number):Observable<CardI>{
    return this.http.get<CardI>(this.cardUrl + '/' + id);
  }
  
}