import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {AuthGuard} from './guards/auth.guard'

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from './services/validate.service'
import {AuthService} from './services/auth.service'
import {FacebookService} from './services/facebook.service'
import {FlashMessagesModule} from 'angular2-flash-messages'

const appRoutes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,HttpModule, FormsModule,FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService,AuthService, AuthGuard,FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
