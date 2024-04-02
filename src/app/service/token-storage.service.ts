import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

const TOKEN_KEY = 'JWT';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getDecodedToken(): any {
    try {
      return jwt_decode(this.getToken());
    } catch(Error) {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getDecodedToken().role === 'ADMIN';
  }
}
