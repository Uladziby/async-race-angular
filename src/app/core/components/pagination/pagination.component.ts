import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() totalItems!: number;
  @Input() itemsPerPage: number = 6;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  totalPages: number = 1;
  pages: number[] = [];

  constructor() {}

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
      ? Math.ceil(this.totalItems / this.itemsPerPage)
      : 1;
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
