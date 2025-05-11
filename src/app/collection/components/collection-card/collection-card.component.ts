import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPoint } from '../../model/collection-points.entity';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  standalone: true,
  styleUrls: ['./collection-card.component.scss'],
  imports: [CommonModule]
})
export class CollectionCardComponent {
  @Input() point!: CollectionPoint;

  selectedPoint: CollectionPoint | null = null;
  showModal = false;

  onSeeMore(point: CollectionPoint) {
    this.selectedPoint = point;
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.showModal = false;
    this.selectedPoint = null;
    document.body.classList.remove('modal-open');
  }
}
