import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UserComponent } from './pages/admin/user/user.component';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';
import { ErrorComponent } from './pages/other/error/error.component';

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
    path: 'admin/users',
    component: UsersComponent
  },
  {
    path: 'admin/user/:id',
    component: UserComponent
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
