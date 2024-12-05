import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInitializer } from './core/constants/initializers/authInitializer';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { requestInterceptor } from './core/interceptors/request.interceptor';
import { responseInterceptor } from './core/interceptors/response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([requestInterceptor, errorInterceptor, responseInterceptor])),
    provideAppInitializer(inject(authInitializer))
  ]
};
