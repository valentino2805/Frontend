import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Action} from "../model/action.entity";

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private apiUrl = 'http://localhost:3000/actions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Action[]> {
    return this.http.get<Action[]>(this.apiUrl);
  }

  addAction(newAction: Action): Observable<Action> {
    return this.http.post<Action>(this.apiUrl, newAction);
  }
}
