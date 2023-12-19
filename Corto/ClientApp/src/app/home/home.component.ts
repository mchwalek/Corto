import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Link } from '../link/link';
import { LinkService } from '../link/link.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  links: Link[] = [];

  constructor(private authService: AuthService, private linkService: LinkService) {
  }

  ngOnInit(): void {
    this.authService.addLoginHandler(this.loadMyShortenedLinks);

    if (this.authService.isLoggedIn) {
      this.loadMyShortenedLinks();
    }
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
    this.links = [];
  }

  get showLogin(): boolean {
    return !this.authService.isLoggedIn;
  }

  get showLogout(): boolean {
    return this.authService.isLoggedIn;
  }

  private loadMyShortenedLinks = () => {
    this.linkService.getMyShortenedLinks().subscribe(x => this.links = x);
  }
}
