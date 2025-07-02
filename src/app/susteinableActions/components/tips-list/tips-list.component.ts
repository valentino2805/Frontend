import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { TipsCardComponent } from "../tips-card/tips-card.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Action } from '../../model/action.entity';
import { TranslateModule } from "@ngx-translate/core";
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-tips-list',
  standalone: true,
  imports: [CommonModule, TipsCardComponent, FormsModule, TranslateModule],
  templateUrl: './tips-list.component.html',
  styleUrl: './tips-list.component.css'
})
export class TipsListComponent implements OnChanges {
  constructor(private actionService: ActionService) {}
  @Input() actions: Action[] = [];
  @Output() favoriteChanged = new EventEmitter<void>();

  filteredActions: Action[] = [];
  searchTerm: string = '';
  filterType: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actions']) {
      this.applyFilters();
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilter(type: string): void {
    this.filterType = type;
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    let tempFiltered = this.actions.filter(a =>
      a.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (!this.filterType || a.type === this.filterType)
    );
    this.filteredActions = this.sortActions(tempFiltered);

    this.totalPages = Math.ceil(this.filteredActions.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    } else if (this.totalPages === 0) {
      this.currentPage = 1;
    }
  }

  get displayedActions(): Action[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredActions.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  toggleFavorite(action: Action): void {
    action.favorite = !action.favorite;
    this.actionService.update(action.id, action).subscribe({
      next: () => {
        this.favoriteChanged.emit();
      },
      error: (err) => {
        console.error('Error updating favorite status:', err);
        action.favorite = !action.favorite;
      }
    });
  }

  deleteAction(id: number): void {
    this.actionService.delete(id).subscribe({
      next: () => {
        this.actions = this.actions.filter(a => a.id !== id);
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error deleting action:', err);
      }
    });
  }

  private sortActions(actions: Action[]): Action[] {
    return [...actions].sort((a, b) => Number(b.favorite) - Number(a.favorite));
  }
}
