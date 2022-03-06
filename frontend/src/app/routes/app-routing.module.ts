import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from '../components/menu-dashboard/dashboard.component';
import {LoginComponent} from '../components/login/login.component';

import { AuthVerificationGuard } from '../guards/auth-verification.guard';
import { AuthLoadGuard as authGuard} from '../guards/auth-load.guard';
import {SidenavComponent} from '../components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
    canActivate: [authGuard],
    canLoad: [AuthVerificationGuard]
  },
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
