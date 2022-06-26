import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/AuthService';
import { BasePage } from '../BasePage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BasePage implements OnInit {
  constructor(
    private authService: AuthService
  ) {
    super()
  }

  ngOnInit(): void {    
  }

  isloggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isMemberOf(role: string): boolean {
    return this.authService.isMemberOf(role);
  }

}
