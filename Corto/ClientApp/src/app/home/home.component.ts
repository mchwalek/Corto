import { Component, OnDestroy, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { LinkService } from '../link/link.service';
import { Link } from '../link/link';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes } from '../app-routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription | null = null;
  isLoggedIn: boolean = false;
  links: Link[] = [];

  constructor(private oauthService: OAuthService, private linkService: LinkService, private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.oauthService.events.subscribe(e => {
      if (e.type === 'token_received') {
        this.isLoggedIn = true;
        this.loadLinks();
      }
    });

    this.checkInitialAuthentication();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate([`/${AppRoutes.Login}`]);
  }

  private checkInitialAuthentication() {
    this.isLoggedIn = this.oauthService.hasValidAccessToken();
    if (this.isLoggedIn) {
      this.loadLinks();
    }
  }

  private loadLinks() {
    this.linkService.getMyShortenedLinks().subscribe(x => this.links = x);
  }
}
