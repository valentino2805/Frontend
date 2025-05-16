import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {TipsCardComponent} from "../tips-card/tips-card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Action } from '../../model/action.entity';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-tips-list',
  standalone: true,
  imports: [CommonModule, TipsCardComponent, FormsModule, TranslateModule],
  templateUrl: './tips-list.component.html',
  styleUrl: './tips-list.component.css'
})
export class TipsListComponent implements OnInit, OnChanges {
  actions: Action[] = [];
  filteredActions: Action[] = [];
  searchTerm: string = '';
  filterType: string = '';
  @Input() externalActions: Action[] = [];

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['externalActions']) {
      this.actions = [
        new Action({
          id: 1,
          title: 'Implementa contenedores diferenciados',
          description: 'Separa residuos en reciclables, orgánicos y peligrosos dentro de la empresa.',
          type: 'almacenamiento'
        }),
        new Action({
          id: 2,
          title: 'Optimiza el uso del aire acondicionado',
          description: 'Programa horarios y temperatura eficiente para reducir el consumo energético.',
          type: 'mejora operativa'
        }),
        new Action({
          id: 3,
          title: 'Promueve la movilidad sostenible',
          description: 'Incentiva el uso de bicicletas o transporte público entre colaboradores.',
          type: 'normativas'
        }),
        ...this.externalActions
      ];
      this.applyFilters();
    }
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilter(type: string): void {
    this.filterType = type;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredActions = this.actions.filter(a =>
      a.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (!this.filterType || a.type === this.filterType)
    );
  }

  toggleFavorite(action: Action): void {
    action.favorite = !action.favorite;
  }

  deleteAction(id: number): void {
    this.actions = this.actions.filter(a => a.id !== id);
    this.applyFilters();
  }
}
