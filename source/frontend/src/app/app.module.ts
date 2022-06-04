import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponentsModule } from './modules/data-components/data-components.module';
import { UsersComponent } from './pages/admin/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './pages/admin/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';
import { ErrorComponent } from './pages/other/error/error.component';
import { NavigationComponent } from './controls/navigation/navigation.component';
import { BreadcrumbsComponent } from './controls/breadcrumbs/breadcrumbs.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    UserComponent,
    NotFoundComponent,
    ErrorComponent,
    NavigationComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
