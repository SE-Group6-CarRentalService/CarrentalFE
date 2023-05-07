import { Injectable } from '@angular/core';
import {UserManagementService} from "./user-management.service";

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
    localStorage.removeItem('customerId');
  }

  getToken(): string {
    return localStorage.getItem(this.key) ?? '';
  }
}
