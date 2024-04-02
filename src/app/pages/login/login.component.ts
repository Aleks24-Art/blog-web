import {Component, OnInit, ViewEncapsulation} from '@angular/core';


import {Router} from "@angular/router";
import {LoginInfo} from "../../model/login-info";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {SharingService} from "../../service/sharing.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // @ts-ignore
  loginInfo: LoginInfo;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private sharingService: SharingService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptLogin(this.loginInfo).subscribe({
        next: (response) => {
          console.log(response);
          console.log(response.token);
          this.tokenStorage.saveToken(response.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.sharingService.setReload(0);
          this.goToHomepage();
        },
        error: (error) => {
          console.log(error);
          alert(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      }
    );
  }

  goToHomepage() {
    this.router.navigateByUrl("/view-all")
  }

  goToRegisterPage() {
    this.router.navigateByUrl("/register");
  }

  goToForgotPasswordPage() {
    this.router.navigateByUrl("/forgot-password");
  }
}
