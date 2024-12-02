import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getBasic<T>(endpoint: string, data?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}${data}`);
  }

  getList<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  postBasic<T>(endpoint: string, data?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}${data}`, null);
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  head<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.head<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  options<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.options<T>(`${this.baseUrl}/${endpoint}`, { params });
  }
}
