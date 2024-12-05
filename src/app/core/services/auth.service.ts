import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { apiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _apiService: apiService, private _router: Router) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  public getToken(): string | null {
    const token = localStorage.getItem('authToken');
    return token || null;
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return of(false);
    return this._apiService.post("/api/", { token: token }).pipe(map((response: any) => response.valid), catchError(() => of(false))
    );
  }

  redirectToLogin(): void {
    this._router.navigate(['/login']);
  }
}
