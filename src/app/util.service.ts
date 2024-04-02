import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UtilService {

  public static handleError(error: HttpErrorResponse) {

    if (error.status === 403) {
      return throwError(() => new Error("Access denied! You don't have enough privileges to perform this operation."));
    }

    if (error.status === 401) {
      return throwError(() => new Error("Incorrect login or password!"));
    }

    return throwError(() => new Error(error.message));
  }
}
