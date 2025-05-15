import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GraphicService {
  private _redrawChart = new Subject<void>();
  redrawChart$ = this._redrawChart.asObservable();

  triggerRedraw() {
    this._redrawChart.next();
  }
}
