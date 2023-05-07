import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  key = 'token';

  constructor() { }

  saveToken(token : string){
    localStorage.setItem(this.key, token);
  }

  removeToken(){
    localStorage.removeItem(this.key);
  }

  getToken(): string {
    return localStorage.getItem(this.key) ?? '';
  }
}
