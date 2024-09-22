import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  // {
  //   path: 'XYZ',
  //   component: LayoutComponent,
  //   loadChildren: () => import('../').then((m) => m.m),
  // },
  { path: '**', redirectTo: 'errors/not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
