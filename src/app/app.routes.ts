  import { Routes } from '@angular/router';
  import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
  import { HomeComponent } from './public/pages/home/home.component';
  const ControlPanelComponent = () => import('./controlPanel/pages/controlPanel.component').then(x => x.ControlPanelComponent);

  export const routes: Routes = [

    { path: 'home', component: HomeComponent },

    { path: 'controlPanel', loadComponent: ControlPanelComponent, title: 'Control Panel' },

    { path: '', component: PageNotFoundComponent },


  ];



