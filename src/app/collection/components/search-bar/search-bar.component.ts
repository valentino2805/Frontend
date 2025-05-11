import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();  // Cambia a string

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.search.emit(inputElement.value);  // Emitimos el valor como string
  }
}
