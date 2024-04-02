import {Component, OnInit, ViewEncapsulation} from '@angular/core';


import {Router} from "@angular/router";
import {LoginInfo} from "../../model/login-info";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {SharingService} from "../../service/sharing.service";

@Component({
  selector: 'app-login',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  password: any;
  errorMessage = '';
  // @ts-ignore
  loginInfo: LoginInfo;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onRestore() {
    console.log(this.form);

    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.authService.forgotPassword(this.loginInfo).subscribe({
        next: (response) => {
          console.log(response);
          console.log(response.token);
          this.tokenStorage.saveToken(response.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
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

  goToLoginPage() {
    this.router.navigateByUrl("/login");
  }
}
