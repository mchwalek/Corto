import { Component, OnDestroy, OnInit } from '@angular/core';
import { LinkService } from '../link/link.service';
import { Link } from '../link/link';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../app-routes';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  links: Link[] = [];

  constructor(private authService: AuthService, private linkService: LinkService, private router: Router) { }

  ngOnInit(): void {
    this.linkService.getMyShortenedLinks().subscribe(x => this.links = x);
  }

  logout() {
    this.authService.logout();
  }
}
