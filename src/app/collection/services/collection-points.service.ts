import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionPoint } from '../model/collection-points.entity';

@Injectable({
    providedIn: 'root'
})
export class CollectionPointsService {

    private apiUrl = 'https://backend-web-applications-1.onrender.com/api/v1/collection-points\n';


    constructor(private http: HttpClient) {}

    getAll(): Observable<CollectionPoint[]> {
        return this.http.get<CollectionPoint[]>(this.apiUrl);
    }

    // Método para agregar un nuevo punto de acopio
    addCollectionPoint(newPoint: CollectionPoint): Observable<CollectionPoint> {
        return this.http.post<CollectionPoint>(this.apiUrl, newPoint);
    }

    // Método para eliminar un punto de acopio
    deleteCollectionPoint(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Método para actualizar un punto de acopio
    updateCollectionPoint(id: string, updatedPoint: CollectionPoint): Observable<CollectionPoint> {
        return this.http.put<CollectionPoint>(`${this.apiUrl}/${id}`, updatedPoint);
    }
}
