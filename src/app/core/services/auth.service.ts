import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');  // Check for token or user data
    return !!token;  // Returns true if token exists, otherwise false
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
