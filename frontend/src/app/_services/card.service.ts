import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { StorageService } from './storage.service';

const baseUrl = 'http://localhost:8080/api/cards';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  username?: string;
  constructor(private http: HttpClient,      
    ) { }

  getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(baseUrl);
  }

  get(id: any): Observable<Card> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    // let current_user = window.localStorage.getItem('current_user');
    // console.log('current_user', current_user)
    // const user = this.storageService.getUser();
    // username = user.username;
    // data = [... username]
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Card[]> {
    return this.http.get<Card[]>(`${baseUrl}?title=${title}`);
  }
}