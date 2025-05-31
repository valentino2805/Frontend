import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {TipsCardComponent} from "../tips-card/tips-card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Action } from '../../model/action.entity';
import {TranslateModule} from "@ngx-translate/core";
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-tips-list',
  standalone: true,
  imports: [CommonModule, TipsCardComponent, FormsModule, TranslateModule],
  templateUrl: './tips-list.component.html',
  styleUrl: './tips-list.component.css'
})
export class TipsListComponent implements OnInit {
  actions: Action[] = [];
  filteredActions: Action[] = [];
  searchTerm: string = '';
  filterType: string = '';

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this.actionService.getAll().subscribe({
      next: (data) => {
        this.actions = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading actions from API', err);
      }
    });
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
    this.actionService.delete(id).subscribe(() => {
      this.actions = this.actions.filter(a => a.id !== id);
      this.applyFilters();
    });
  }
}
