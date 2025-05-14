import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { HomeComponent } from './public/pages/home/home.component';
import { CollectionPointsPage } from './collection/pages/collection-points/collection-points.component';
import { ReportsComponent } from './collection/pages/reports/reports.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },

  // ✅ Agregamos la ruta para collection-points
  { path: 'collectionpoints', component: CollectionPointsPage },

  // ✅ Agregamos la ruta para reports
  { path: 'reports', component: ReportsComponent },

  // ✅ Redirección raíz a /home (opcional)
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ✅ Página no encontrada (debe ir al final)
  { path: '**', component: PageNotFoundComponent }

];
