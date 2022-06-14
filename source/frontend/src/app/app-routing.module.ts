import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UserComponent } from './pages/admin/user/user.component';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';
import { ErrorComponent } from './pages/other/error/error.component';
import { PartsComponent } from './pages/admin/parts/parts.component';
import { PartComponent } from './pages/admin/part/part.component';
import { ForbiddenComponent } from './pages/other/forbidden/forbidden.component';
import { IsLoggedInGuard } from './services/auth/IsLoggedInGuard';
import { IsRoleMemberGuard } from './services/auth/IsRoleMemberGuard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/user/:id',
    component: UserComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/parts',
    component: PartsComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/part/:id',
    component: PartComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
