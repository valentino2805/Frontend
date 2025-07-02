import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TipsListComponent } from "../../components/tips-list/tips-list.component";
import { Action } from "../../model/action.entity";
import {
  ActionsCreateAndEditComponent
} from "../../components/actions-create-and-edit/actions-create-and-edit.component";
import { CommonModule } from "@angular/common";
import { ActionService } from "../../services/action.service";

@Component({
  selector: 'app-sustainable-actions',
  standalone: true,
  imports: [CommonModule, TranslateModule, TipsListComponent, ActionsCreateAndEditComponent],
  templateUrl: './sustainable-actions.component.html',
  styleUrl: './sustainable-actions.component.css'
})
export class SustainableActionsComponent implements OnInit {
  showModal = false;
  newAction: Action | null = null;

  actions: Action[] = [];

  constructor(private actionService: ActionService) {}

  ngOnInit(): void {
    this.loadActions();
  }

  loadActions(): void {
    this.actionService.getAll().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.actions = this.sortActions(data);
        } else {
          console.error('Data received from API is not an array:', data);
          this.actions = [];
        }
      },
      error: (err) => {
        console.error('Error loading actions:', err);
      }
    });
  }

  openModal() {
    this.newAction = new Action({ id: Date.now(), title: '', description: '', type: '', favorite: false });
    this.showModal = true;
  }

  onSaveAction(action: Action) {
    this.actionService.create(action).subscribe({
      next: (savedAction) => {
        const newActionInstance = new Action(savedAction);
        this.actions = [...this.actions, newActionInstance];
        this.actions = this.sortActions(this.actions);
      },
      error: (err) => {
        console.error('Error saving action:', err);
      },
      complete: () => {
        this.onCloseModal();
        this.loadActions();
      }
    });
  }

  private sortActions(actions: Action[]): Action[] {
    return actions.sort((a, b) => Number(b.favorite) - Number(a.favorite));
  }

  onCloseModal() {
    this.showModal = false;
    this.newAction = null;
  }

  onFavoriteChanged() {
    this.loadActions();
  }
}
