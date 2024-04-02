import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {UtilService} from "../util.service";
import {LoginInfo} from "../model/login-info";
import {JwtResponse} from "../model/jwt-response";
import {RegistrationInfo} from "../model/registration-info";
import {TokenInfo} from "../model/token-info";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseServerUrl = 'http://localhost:8092';

  constructor(private http: HttpClient) {
  }

  attemptLogin(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseServerUrl}/api/v1/login`, credentials, httpOptions)
      .pipe(catchError(UtilService.handleError));
  }

  register(info: RegistrationInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseServerUrl}/api/v1/registration`, info, httpOptions)
      .pipe(catchError(UtilService.handleError));
  }

  forgotPassword(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(`${this.baseServerUrl}/api/v1/reset-password`, credentials, httpOptions)
      .pipe(catchError(UtilService.handleError));
  }

  getUserInfo(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseServerUrl}/api/v1/user/profile/${token}`)
      .pipe(catchError(UtilService.handleError));
  }

  updateUserInfo(profile: any): Observable<any> {
    return this.http.put<any>(`${this.baseServerUrl}/api/v1/user/profile/update`, profile, httpOptions)
      .pipe(catchError(UtilService.handleError));
  }
}
