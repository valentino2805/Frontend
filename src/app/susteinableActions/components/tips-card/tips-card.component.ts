import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Action} from "../../model/action.entity";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-tips-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './tips-card.component.html',
  styleUrl: './tips-card.component.css'
})
export class TipsCardComponent {
  @Input() action!: Action;
  @Output() toggleFavorite = new EventEmitter<Action>();
  @Output() delete = new EventEmitter<number>();
}
