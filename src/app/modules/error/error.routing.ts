import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InternalServerErrorComponent } from './pages/internal-server-error/internal-server-error.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: "",
    component: ErrorComponent,
    children: [
      { path: '', redirectTo: '404', pathMatch: 'full' },
      { path: '500', component: InternalServerErrorComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: '**', redirectTo: 'errors/not-found' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
