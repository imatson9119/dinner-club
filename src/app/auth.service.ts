import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean;
  constructor() { 
    this.authenticated = localStorage.getItem('passed_challenge') === 'true'
  }

  getAuthenticated(){
    return this.authenticated;
  }

  setAuthenticated(val: boolean){
    this.authenticated = val;
    localStorage.setItem('passed_chanllenge', val.toString())
  }
}
