import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionI } from './interfaces/collection';


@Injectable({
  providedIn: 'root',
})
export class CollectionsService {

  collcectionUrl:string = "http://localhost:8080/collections"

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){

  }


  getCollections(id:number):Observable<CollectionI[]> {
    return this.http.get<CollectionI[]>(this.collcectionUrl + "/user/" + id);
  }

  createCollectionForUser(userId: number, name: string, publicity: boolean): Observable<CollectionI> {
    console.log(name);
    return this.http.post<CollectionI>(`${this.collcectionUrl}/users/${userId}/collections`, { name, publicity });
  }

  getCollectionsForUser(userId: number): Observable<CollectionI[]> {
    return this.http.get<CollectionI[]>(`${this.collcectionUrl}/users/${userId}/collections`);
  }

  addVersionToCollection(userId: number, collectionId: number, versionId: number): Observable<CollectionI> {
    return this.http.post<CollectionI>(`${this.collcectionUrl}/users/${userId}/collections/${collectionId}/version`, { versionId });
  }
}
