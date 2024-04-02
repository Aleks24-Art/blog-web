import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {RegistrationInfo} from "../../model/registration-info";
import {SharingService} from "../../service/sharing.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: any = {};
  isRegistered = false;
  isRegisterFailed = false;
  errorMessage = '';
  // @ts-ignore
  private registrationInfo: RegistrationInfo;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private sharingService: SharingService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isRegistered = true;
    }
  }

  onSubmit() {
    console.log(this.form);

    this.registrationInfo = new RegistrationInfo(
      this.form.first_name,
      this.form.last_name,
      this.form.username,
      this.form.password);

    this.authService.register(this.registrationInfo).subscribe({
        next: (response) => {
          console.log(response);
          console.log(response.token);
          this.tokenStorage.saveToken(response.token);
          this.isRegisterFailed = false;
          this.isRegistered = true;
          this.sharingService.setReload(0);
          this.goToHomepage();
        },
        error: (error) => {
          console.log(error);
          alert(error);
          this.errorMessage = error.error.message;
          this.isRegisterFailed = true;
        }
      }
    );
  }

  goToHomepage() {
    this.router.navigateByUrl('/view-all')
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }

}
