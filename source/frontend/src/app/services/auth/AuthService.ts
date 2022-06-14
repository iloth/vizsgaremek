import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { UserModel } from 'src/app/models/admin/UserModel';
import { ILogin, ILoginResult } from 'src/app/models/common/auth';
import { environment } from 'src/environments/environment';
import { UserService } from '../admin/UserService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService    
  ) {
    
    const currentLoginJSON = sessionStorage.getItem(this.storageKey);
    if (currentLoginJSON) {
      const currentLogin = JSON.parse(currentLoginJSON) as ILoginResult;
      this.setLoginInfo(currentLogin);
    }
   }

  private storageKey = 'accessToken'; 
  private loginUrl =  environment.apiUrl + 'auth/login';
  private logoutUrl =  environment.apiUrl + 'auth/logout';


  currentUser$: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  accessToken: string | null = null;
  refreshToken: string | null = null;

  private setLoginInfo(login: ILoginResult) {
    this.accessToken = login.accessToken;
    this.refreshToken = login.refreshToken;
    this.currentUser$.next(login.user);
  }

  async login(login: ILogin): Promise<UserModel> {
    return firstValueFrom(this.http.post<ILoginResult>(this.loginUrl, login)).then(
      (response: ILoginResult) => {
        sessionStorage.setItem(this.storageKey, JSON.stringify(response));
        this.setLoginInfo(response);
        return response.user;         
      },
      (err: Error) => {
        throw err;
      }
    )
  }

  async logout() {
    sessionStorage.removeItem(this.storageKey);
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUser$.next(null);

    await firstValueFrom(this.http.post(this.logoutUrl, { accessToken: this.accessToken }));
  }
}
