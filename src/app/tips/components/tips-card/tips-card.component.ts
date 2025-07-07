
import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Action} from "../../model/action.entity";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {AuthService} from "../../../users/services/auth.service";


@Component({
  selector: 'app-tips-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './tips-card.component.html',
  styleUrl: './tips-card.component.css'
})
export class TipsCardComponent implements OnInit {
  @Input() action!: Action;
  @Output() toggleFavorite = new EventEmitter<Action>();
  @Output() delete = new EventEmitter<number>();

  currentUserId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.currentUserId = this.authService.currentUserValue?.id || null;
    console.log(`[TipsCardComponent] Action ID: ${this.action.id}, Creator ID: ${this.action.creatorUserId}, Current User ID: ${this.currentUserId}`);
  }

  /**
   * Verifica si el usuario actual es el creador de la acción.
   * @returns true si el usuario actual es el creador, false en caso contrario.
   */
  isCreator(): boolean {
    return this.currentUserId !== null && this.action.creatorUserId !== undefined &&
      this.currentUserId === this.action.creatorUserId;
  }
}
