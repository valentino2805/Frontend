import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { HomeComponent } from './public/pages/home/home.component';
import { CollectionPointsPage } from './collection/pages/collection-points/collection-points.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },

  // ✅ Agregamos la ruta para collection-points
  { path: 'collectionpoints', component: CollectionPointsPage },

  // ✅ Redirección raíz a /home (opcional)
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ✅ Página no encontrada (debe ir al final)
  { path: '**', component: PageNotFoundComponent }

];
