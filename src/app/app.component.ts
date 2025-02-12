import { Component, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../environments/environment';

// Capture gtag
declare var gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Properties
  title = 'FinanceTrackerApplication';
  userLoggedIn: boolean = false;
  
  // Constructor
  constructor(public router:Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects);
        gtag('config', environment.ANALYTICS_API, {'page_path':event.urlAfterRedirects})
      }
    });
  }
}
