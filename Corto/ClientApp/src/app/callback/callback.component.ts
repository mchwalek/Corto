import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  template: `<p>Loading...</p>`
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.completeAuthentication().then(() => {
      window.location.href = '/';
    });
  }
}
