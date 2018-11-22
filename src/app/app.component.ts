import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Web';
  router: string;
  
  constructor(
     private _router: Router
  ) {
      this.router = _router.url;
  }
}
