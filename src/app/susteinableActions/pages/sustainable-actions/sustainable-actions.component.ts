import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {TipsListComponent} from "../../components/tips-list/tips-list.component";
import {Action} from "../../model/action.entity";
import {
  ActionsCreateAndEditComponent
} from "../../components/actions-create-and-edit/actions-create-and-edit.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sustainable-actions',
  standalone: true,
  imports: [CommonModule,TranslateModule,TipsListComponent,ActionsCreateAndEditComponent],
  templateUrl: './sustainable-actions.component.html',
  styleUrl: './sustainable-actions.component.css'
})
export class SustainableActionsComponent {
  showModal = false;
  newAction: Action | null = null;

  createdActions: Action[] = [];
  accionesDesdeModal: Action[] = [];

  openModal() {
    this.newAction = new Action({ id: Date.now(), title: '', description: '', type: '', favorite: false });
    this.showModal = true;
  }

  onSaveAction(action: Action) {
    this.createdActions.push(action);
    this.accionesDesdeModal = [...this.createdActions];
  }

  onCloseModal() {
    this.showModal = false;
  }
}
