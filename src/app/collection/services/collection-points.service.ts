import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionPoint } from '../model/collection-points.entity';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointsService {

  private apiUrl = 'http://localhost:3000/collectionPoints';  // Asegúrate de que esta URL esté correcta para tu db.json

  constructor(private http: HttpClient) {}

  getAll(): Observable<CollectionPoint[]> {
    return this.http.get<CollectionPoint[]>(this.apiUrl);
  }

  // Método para agregar un nuevo punto de acopio
  addCollectionPoint(newPoint: CollectionPoint): Observable<CollectionPoint> {
    return this.http.post<CollectionPoint>(this.apiUrl, newPoint);
  }

}
