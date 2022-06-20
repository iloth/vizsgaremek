import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models/admin/UserModel';
import { AuthService } from 'src/app/services/auth/AuthService';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  user$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null) ;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => { this.user$.next(user); }
    })
  }
  
  isMemberOf(role: string): boolean {
    const user = this.user$.getValue();
    if (user) {
      return user.roles.includes(role);
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    const user = this.user$.getValue();
    console.log(user);
    return user != null;
  }

  async onLogoutClick() {
    await this.authService.logout();
    this.router.navigate(['']);
  }

  async onLoginClick() {
    this.router.navigate(['/', 'login']);
  }

}
