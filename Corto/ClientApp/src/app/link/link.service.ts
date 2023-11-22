import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'oidc-client-ts';
import { Link } from './link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private apiUrl = 'https://localhost:7248/links';

  constructor(private http: HttpClient) { }

  getMyShortenedLinks(user: User): Promise<Link[] | undefined> {
    const headers = new HttpHeaders({
      'Authorization': `${user.token_type} ${user.id_token}`
    });

    return this.http.get<Link[]>(this.apiUrl, { headers }).toPromise();
  }
}
