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
import { OrdersComponent } from './pages/sale/orders/orders.component';
import { MyProfileComponent } from './pages/my/profile/profile.component';
import { MyOrdersComponent } from './pages/my/orders/orders.component';
import { OrderComponent } from './pages/sale/order/order.component';
import { OrderItemComponent } from './pages/sale/order-item/order-item.component';
import { OrderItemsComponent } from './pages/sale/order-items/order-items.component';

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
      expectedRoles: ['admin']
    }
  },
  {
    path: 'admin/user/:id',
    component: UserComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'admin/parts',
    component: PartsComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'admin/part/:id',
    component: PartComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRoles: ['admin']
    }
  },
  {
    path: 'sale/orders',
    component: OrdersComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRoles: ['admin', 'empl']
    }
  },
  {
    path: 'sale/order/:id',
    component: OrderComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRoles: ['admin', 'empl']
    }
  },
  {
    path: 'sale/orderitem/:id',
    component: OrderItemComponent,
    canActivate: [IsLoggedInGuard, IsRoleMemberGuard],
    data: {
      expectedRoles: ['admin', 'empl']
    }
  },
  {
    path: 'my/profile',
    component: MyProfileComponent,
    canActivate: [IsLoggedInGuard],
  },  
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [IsLoggedInGuard],
  },  
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 50],
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
