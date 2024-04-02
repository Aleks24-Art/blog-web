import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./service/token-storage.service";
import {SharingService} from "./service/sharing.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-web';

  constructor(private tokenService: TokenStorageService) { }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }
}
