import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreatePostComponent} from "./pages/create-post/create-post.component";
import {ViewAllComponent} from "./pages/view-all/view-all.component";
import {ViewPostComponent} from "./pages/view-post/view-post.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ForgotPasswordComponent} from "./pages/forgor-password/forgot-password.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {path: '', redirectTo: 'view-all', pathMatch: 'full'},
  {path:'create-post', component: CreatePostComponent},
  {path:'view-all', component: ViewAllComponent},
  {path:'view-post/:id', component: ViewPostComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'profile', component: ProfileComponent},
  {path:'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
