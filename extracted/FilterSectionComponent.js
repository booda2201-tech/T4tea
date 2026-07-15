import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
export let FilterSectionComponent = class FilterSectionComponent {
  constructor() {
    this.title = '';
    this.options = [];
    this.selected = [];
    this.isOpen = true;
  }
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  isSelected(option) {
    return this.selected.includes(option);
  }
};
__decorate([Input()], FilterSectionComponent.prototype, "title", void 0);
__decorate([Input()], FilterSectionComponent.prototype, "options", void 0);
__decorate([Input()], FilterSectionComponent.prototype, "selected", void 0);
FilterSectionComponent = __decorate([Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss']
})], FilterSectionComponent);