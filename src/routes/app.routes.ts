import { Routes } from '@angular/router';

export const routes: Routes = [

  // common Routes
  { path: "login", loadComponent: () => import('../shared/pages/login-page/login-page.component').then(_ => _.LoginPageComponent) },
  { path: "signup", loadComponent: () => import('../shared/pages//signup-page/signup-page.component').then(_ => _.SignupPageComponent) },
  { path: "reset-password", loadComponent: () => import('../shared/pages/reset-pass-page/reset-pass-page.component').then(_ => _.ResetPassPageComponent) },
  { path: "unauthorized", loadComponent: () => import('../shared/pages/unauthorized/unauthorized.component').then(_ => _.UnauthorizedComponent) },
  { path: "**", loadComponent: () => import('../shared/pages/not-found/not-found.component').then(_ => _.NotFoundComponent) },
];
