import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  jwtToken: string;
  decodedToken: { [key: string]: string };

  constructor() {
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    console.log(jwt_decode(this.jwtToken));
    }
  }

  decodeToken() {
    if (this.jwtToken) {
    this.decodedToken = jwt_decode(this.jwtToken);
    console.log(this.decodeToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.given_name : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: string = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * Number(expiryTime)) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
