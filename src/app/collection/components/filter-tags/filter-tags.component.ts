import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-tags',
  templateUrl: './filter-tags.component.html',
  standalone: true,
  styleUrls: ['./filter-tags.component.scss']
})
export class FilterTagsComponent {
  @Output() filter = new EventEmitter<string>();

  // Método modificado con una afirmación de tipo
  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;  // Afirmación de tipo
    this.filter.emit(selectElement.value);  // Ahora podemos acceder a .value
  }
}
