import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularMaterialModule} from "./AngularMaterialModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import {LoginComponent} from "./pages/login/login.component";
import {httpInterceptorProviders} from "./interceptor/auth-interceptor";
import {RegisterComponent} from "./pages/register/register.component";
import {ForgotPasswordComponent} from "./pages/forgor-password/forgot-password.component";
import {ProfileComponent} from "./pages/profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ViewAllComponent,
    ViewPostComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
