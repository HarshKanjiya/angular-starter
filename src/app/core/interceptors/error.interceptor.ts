import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotifyService } from '../../shared/services/notify.service';
import { ErrorMessages, NotifycationTypes } from '../constants/common.constants';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const notifyService = inject(NotifyService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = ErrorMessages['UNKNOWN_ERROR'];
            let shouldNavigate = false;
            let navigateTo = '';

            switch (error.status) {
                case 400:
                    errorMessage = ErrorMessages[400];
                    break;
                case 401:
                    errorMessage = ErrorMessages[401];
                    shouldNavigate = true;
                    navigateTo = '/login';
                    break;
                case 403:
                    errorMessage = ErrorMessages[403];
                    shouldNavigate = true;
                    navigateTo = '/access-denied';
                    break;
                case 404:
                    errorMessage = ErrorMessages[404];
                    break;
                case 405:
                    errorMessage = ErrorMessages[405];
                    break;
                case 500:
                    errorMessage = ErrorMessages[500];
                    break;
                default:
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Client Error: ${error.error.message}`;
                    } else {
                        errorMessage = `Server Error: ${error.message}`;
                    }
            }

            console.error('HTTP Error:', {
                status: error.status,
                message: errorMessage,
                url: req.url,
                fullError: error
            });

            notifyService.notify(errorMessage, NotifycationTypes.Error, navigateTo);

            if (shouldNavigate) {
                router.navigate([navigateTo]);
            }

            if (error.status === 401) {
                localStorage.removeItem('authToken');
            }

            return throwError(() => ({
                status: error.status,
                message: errorMessage,
                originalError: error
            }));
        })
    );
};