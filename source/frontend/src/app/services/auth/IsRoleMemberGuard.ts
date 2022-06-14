import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserModel } from "src/app/models/admin/UserModel";
import { AuthService } from "./AuthService";

@Injectable({
  providedIn: 'root'
})
export class IsRoleMemberGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user: UserModel | null = this.auth.currentUser$.getValue();
    if (!user || (route.data && route.data['expectedRole'] && !(user.roles?.includes(route.data['expectedRole']) ?? false))) {
      this.router.navigate(['/', 'forbidden'], { skipLocationChange: true });
      return false;
    }

    return true;
  }

}