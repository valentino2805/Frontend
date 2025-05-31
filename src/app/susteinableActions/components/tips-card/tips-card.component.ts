import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Action} from "../../model/action.entity";
import {CommonModule} from "@angular/common";
import {ActionService} from '../../services/action.service';

@Component({
  selector: 'app-tips-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips-card.component.html',
  styleUrl: './tips-card.component.css'
})
export class TipsCardComponent {
  @Input() action!: Action;
  @Output() toggleFavorite = new EventEmitter<Action>();
  @Output() delete = new EventEmitter<number>();
}
