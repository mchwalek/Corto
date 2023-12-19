import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from './link';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private apiUrl = 'https://localhost:7248/links';

  constructor(private http: HttpClient) { }

  getMyShortenedLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.apiUrl);
  }
}
