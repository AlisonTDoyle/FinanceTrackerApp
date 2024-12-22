import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  // Properties
  protected isLoggedIn: boolean = false;

  // Constructor
  constructor(private _authService: AuthService) {

  } 

  // Event listeners
  ngOnInit() {
    this._authService.GetCurrentUser().subscribe(res => {
      this.isLoggedIn = res.error?.name == "AuthSessionMissingError" ? false : true;
    });
  }

  // Methods
  protected SignOutUser() {
    this._authService.SignOut();
  }
}
