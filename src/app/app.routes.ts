  import { Routes } from '@angular/router';
  import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
  import { ReportsComponent } from './collection/pages/reports/reports.component';
  import { HomeComponent } from './public/pages/home/home.component';
  const ControlPanelComponent = () => import('./controlPanel/pages/controlPanel.component').then(x => x.ControlPanelComponent);
  const CollectionPointsComponent=()=> import ('./collection/pages/collection-points/collection-points.component').then(x => x.CollectionPointsPage);

  export const routes: Routes = [

    { path: 'home', component: HomeComponent },

    { path: 'controlPanel', loadComponent: ControlPanelComponent, title: 'Control Panel' },

    { path: 'collectionPoints', loadComponent: CollectionPointsComponent, title: 'Control Panel' },
    { path: 'reports', component: ReportsComponent },

    { path: '', component: PageNotFoundComponent },


  ];




