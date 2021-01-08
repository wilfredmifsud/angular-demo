import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { AuthLoginRequest, AuthUserProfile } from "./auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  // dummy authentication method
  login$(data: AuthLoginRequest): Observable<AuthUserProfile | null> {
    if(data.password === "letmein") {
      return of({
        country: "Malta",
        email: "johny@mail.com",
        name: "Norton",
        surname: "Aego",
        username: data.username,
      });
    }
   return throwError('Invalid Account')
  }
}
