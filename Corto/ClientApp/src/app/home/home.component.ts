import { Component, OnDestroy, OnInit } from '@angular/core';
import { LinkService } from '../link/link.service';
import { Link } from '../link/link';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  links: Link[] = [];

  constructor(private authService: AuthService, private linkService: LinkService) { }

  ngOnInit(): void {
    this.linkService.getMyShortenedLinks().subscribe(x => this.links = x);
  }

  logout(): Promise<void> {
    return this.authService.logout();
  }
}
