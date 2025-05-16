import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPoint } from '../../model/collection-points.entity';
import { CollectionPointsService } from '../../services/collection-points.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  standalone: true,
  styleUrls: ['./collection-card.component.scss'],
  imports: [CommonModule]
})
export class CollectionCardComponent {
  @Input() point!: CollectionPoint;
  @Output() pointDeleted = new EventEmitter<number>();

  selectedPoint: CollectionPoint | null = null;
  showModal = false;

  constructor(private collectionPointsService: CollectionPointsService) {}

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

  deletePoint(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este punto de recolección?')) {
      this.collectionPointsService.deleteCollectionPoint(id).subscribe({
        next: () => {
          this.pointDeleted.emit(id);
        },
        error: (error) => {
          console.error('Error al eliminar el punto:', error);
          alert('Hubo un error al eliminar el punto de recolección');
        }
      });
    }
  }
}
