import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponentsModule } from './modules/data-components/data-components.module';
import { UsersComponent } from './pages/admin/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './pages/admin/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';
import { ErrorComponent } from './pages/other/error/error.component';
import { NavigationComponent } from './controls/navigation/navigation.component';
import { PartsComponent } from './pages/admin/parts/parts.component';
import { PartComponent } from './pages/admin/part/part.component';
import { BurgerPartFilterComponent } from './controls/burger-part-filter/burger-part-filter.component';
import { BurgerPartFilterPipe } from './pipes/burger-part-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForbiddenComponent } from './pages/other/forbidden/forbidden.component';
import { JwtInterceptor } from './services/auth/JwtInterceptor';
import { AuthService } from './services/auth/AuthService';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/sale/orders/orders.component';
import { OrderComponent } from './pages/sale/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ErrorComponent,
    NavigationComponent,
    UsersComponent,
    UserComponent,
    PartsComponent,
    PartComponent,
    BurgerPartFilterComponent,
    BurgerPartFilterPipe,
    ForbiddenComponent,
    LoginComponent,
    OrdersComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataComponentsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
