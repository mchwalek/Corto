import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LinkService } from '../link/link.service';

@Component({
  selector: 'app-callback',
  template: `<p>Loading...</p>`
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, private linkSrvice: LinkService) { }

  async ngOnInit() {
    const user = await this.authService.completeAuthentication();
    const response = await this.linkSrvice.getMyShortenedLinks(user);
    console.log(response);
  }
}
