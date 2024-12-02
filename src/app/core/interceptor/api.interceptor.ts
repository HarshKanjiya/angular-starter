import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UtilityService } from '../services/utility.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { IError, IResponse } from '../../shared/models/common.types';
import { ErrorMessages } from '../constants/common.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {

  constructor(private _utilityService: UtilityService, private _authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = this.processRequest(request);
    return next.handle(modifiedRequest).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return this.processResponse(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.raiseError(error.status);
        return throwError(() => error);
      })
    );
  }

  private processRequest(request: HttpRequest<any>): HttpRequest<any> {
    let modifiedRequest = request.clone();

    try {
      // Encrypt request body if exists
      if (request?.body) {
        const encryptedBody = environment.production ? this._utilityService.encrypt(request.body) : request.body;

        modifiedRequest = request.clone({
          body: { encryptedData: encryptedBody },
          headers: request.headers
            .set('Content-Type', 'application/encrypted')
            .set('Authorization', `Bearer ${this._authService.getToken()}`)
        });
      }
    } catch (error) {
      this.raiseError('Request processing failed', "Something went wrong while processing the request");
    }

    return modifiedRequest;
  }

  private processResponse(response: HttpResponse<any>): HttpResponse<any> {
    try {
      if (response?.body) {
        const decryptedData = environment.production ? this._utilityService.decrypt(response.body) : response.body;

        if (this.isErrorResponse(decryptedData)) {
          this.raiseError(decryptedData.errorCode, decryptedData.message, decryptedData.details);
          return response.clone({ body: null });
        }

        const transformedBody: IResponse = {
          success: decryptedData?.Success,
          message: decryptedData?.Message || '',
          data: decryptedData?.Data || null
        };

        return response.clone({ body: transformedBody });
      }
    } catch (error) {
      this.raiseError('Response processing failed', "Something went wrong while processing the Response");
    }

    return response;
  }

  private isErrorResponse(body: any): boolean {
    return (
      body.status === 'error' || body.error || body.errorCode || body.message?.includes('error')
    );
  }

  private raiseError(code: number | string = 'UNKNOWN_ERROR', message?: string, details: string | null = null): void {
    const errorMessage = message || ErrorMessages[code] || ErrorMessages['UNKNOWN_ERROR'];
    this.NotifyUser({ code, message: errorMessage, details })
  }

  private NotifyUser(error: IError): void {
    console.log('error :>> ', error);
  }
}
