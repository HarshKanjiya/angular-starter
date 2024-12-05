import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilityService } from '../services/utility.service';
import { IResponse } from '../../shared/models/common.types';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
    const utilityService = inject(UtilityService);

    return next(req).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                try {
                    let transformedBody: IResponse;
                    if (environment.production) {
                        if (event.headers.get('X-Response-Encrypted') === 'true') {
                            const decryptedBody = utilityService.decrypt(event.body);
                            transformedBody = {
                                success: decryptedBody?.Success ?? false,
                                message: decryptedBody?.Message || null,
                                data: decryptedBody?.Data || null,
                                totalCount: decryptedBody?.TotalCount || null
                            };
                        } else {
                            transformedBody = {
                                success: event.body?.Success ?? false,
                                message: event.body?.Message || null,
                                data: event.body?.Data || null,
                                totalCount: event.body?.TotalCount || null
                            };
                        }
                    } else {
                        transformedBody = {
                            success: event.body?.Success ?? false,
                            message: event.body?.Message || null,
                            data: event.body?.Data || null,
                            totalCount: event.body?.TotalCount || null
                        };
                    }
                    return event.clone({ body: transformedBody });
                } catch (error) {
                    console.error('Response transformation error', error);
                    return event;
                }
            }
            return event;
        })
    );
};