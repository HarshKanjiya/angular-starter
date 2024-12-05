import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UtilityService } from '../services/utility.service';
import { environment } from '../../environments/environment';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const utilityService = inject(UtilityService);

    let modifiedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authService.getToken()}`
        }
    });

    if (environment.production) {
        if (req.body) {
            modifiedReq = req.clone({
                body: utilityService.encrypt(req.body),
                headers: req.headers.set('Content-Type', 'text/plain')
            });
        }

        modifiedReq = modifiedReq.clone({
            headers: modifiedReq.headers
                .set('X-Request-Timestamp', Date.now().toString())
                .set('X-Request-Encrypted', 'true')
        });
    }

    return next(modifiedReq);
};