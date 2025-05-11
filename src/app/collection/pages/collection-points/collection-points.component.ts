import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCardComponent } from '../../components/collection-card/collection-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FilterTagsComponent } from '../../components/filter-tags/filter-tags.component';
import { CollectionPoint } from '../../model/collection-points.entity';
import { CollectionPointsService } from '../../services/collection-points.service';
import { AddCollectionPointModalComponent } from '../../components/add-collection-point/add-collection-point.component';
import * as L from 'leaflet';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-collection-points',
  templateUrl: './collection-points.component.html',
  standalone: true,
  styleUrls: ['./collection-points.component.scss'],
  imports: [
    CommonModule,
    CollectionCardComponent,
    SearchBarComponent,
    FilterTagsComponent,
    MatDialogModule  // <-- AÑADIDO AQUÍ
  ]

})
export class CollectionPointsPage implements OnInit {
  points: CollectionPoint[] = [];
  filteredPoints: CollectionPoint[] = [];
  searchTerm: string = '';
  currentFilter: string = '';

  map!: L.Map;
  markerGroup!: L.LayerGroup;

  constructor(
    private service: CollectionPointsService,
    private dialog: MatDialog  // <-- AÑADIDO AQUÍ
  ) {}


  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.points = data;
      this.filteredPoints = data;
      this.initMap();
      this.updateMapMarkers();
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  onFilter(type: string): void {
    this.currentFilter = type;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredPoints = this.points.filter(point => {
      const matchesSearch = point.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      let matchesFilter = true;

      if (this.currentFilter === 'residuo') {
        matchesFilter = point.materials.length > 0;
      } else if (this.currentFilter === 'distrito') {
        matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });

    this.updateMapMarkers();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [-12.0464, -77.0428],
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markerGroup = L.layerGroup().addTo(this.map);
  }

  updateMapMarkers(): void {
    this.markerGroup.clearLayers();

    if (this.filteredPoints.length === 0) return;

    this.filteredPoints.forEach(point => {
      const marker = L.marker([point.lat, point.lng])
        .bindPopup(`<strong>${point.name}</strong><br/>${point.schedule}`);
      this.markerGroup.addLayer(marker);
    });

    const bounds = L.latLngBounds(this.filteredPoints.map(p => [p.lat, p.lng]));
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }

  // Función para abrir el modal y obtener el nuevo punto de acopio
  openAddPointModal(): void {
    const dialogRef = this.dialog.open(AddCollectionPointModalComponent);

    // Cuando el modal se cierra, obtenemos los datos
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si el modal devolvió un resultado, agregamos el punto
        const newPoint: CollectionPoint = {
          id: this.generateId(),  // Genera un ID único
          name: result.name,
          schedule: result.schedule,
          phone: result.phone || '',  // Si no se completó, dejamos vacío
          materials: result.materials,  // Usamos el valor tal cual (ya es un array)
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lng),
        };

        // Añadimos el nuevo punto al servicio
        this.service.addCollectionPoint(newPoint).subscribe(() => {
          // Actualizamos el array de puntos, pero solo agregamos si no existe ya
          if (!this.points.some(point => point.id === newPoint.id)) {
            this.points.push(newPoint);
          }
          // Actualizamos filteredPoints con el mismo nuevo punto
          if (!this.filteredPoints.some(point => point.id === newPoint.id)) {
            this.filteredPoints.push(newPoint);
          }

          // Actualizamos los marcadores en el mapa
          this.updateMapMarkers();
        });
      }
    });
  }




  // Función para generar un ID único (esto es solo un ejemplo)
  generateId(): number {
    return Math.floor(Math.random() * 1000000);  // Genera un id aleatorio
  }


}
