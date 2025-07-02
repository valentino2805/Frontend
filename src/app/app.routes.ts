import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { ReportsComponent } from './collection/pages/reports/reports.component';
import { HomeComponent } from './public/pages/home/home.component';
const ControlPanelComponent = () => import('./controlPanel/pages/controlPanel.component').then(x => x.ControlPanelComponent);
const CollectionPointsComponent=()=> import ('./collection/pages/collection-points/collection-points.component').then(x => x.CollectionPointsPage);
const SustenaibleActionsComponent=()=> import ('./susteinableActions/pages/sustainable-actions/sustainable-actions.component').then(x => x.SustainableActionsComponent);
const RewardsComponent=()=> import ('./rewards/pages/rewards/rewards.component').then(x => x.RewardsComponent);

import { LoginComponent } from './users/pages/login/login.component';
import { AuthGuard } from './users/services/auth.guard';
import { RegisterComponent } from './users/pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },


  { path: 'controlPanel', loadComponent: ControlPanelComponent, title: 'Control Panel' },
  { path: 'collectionPoints', loadComponent: CollectionPointsComponent, title: 'Control Panel' },
  { path: 'reports', component: ReportsComponent },
  { path: 'sustainableActions', loadComponent: SustenaibleActionsComponent, title: 'Sustenaible Actions' },
  { path: 'rewards', loadComponent: RewardsComponent, title: 'Sustenaible Actions' },




];

