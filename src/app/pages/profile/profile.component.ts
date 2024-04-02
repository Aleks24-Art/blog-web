import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  profile: any;

  constructor(private matSnackBar: MatSnackBar,
              private authService: AuthService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.token.getToken() === null) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserInfo(this.token.getToken()).subscribe(response => {
      console.log(response)
      this.profile = response;
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok");
    });
  }

  updateUserProfile() {
    this.authService.updateUserInfo(this.profile).subscribe(response => {
      console.log(response)
      this.profile = response;
      this.matSnackBar.open("You profile successfully updated!", "Ok");
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok");
    });
  }

}
