import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
})
export class FilterSectionComponent {
  @Input() title = '';
  @Input() options: string[] = [];
  @Input() selected: string[] = [];
  @Output() filterToggle = new EventEmitter<string>();
  isOpen = true;

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  isSelected(option: string): boolean {
    return this.selected.includes(option);
  }

  onToggle(option: string, event: Event): void {
    event.preventDefault();
    this.filterToggle.emit(option);
  }
}
