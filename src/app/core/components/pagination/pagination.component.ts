import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { getVisiblePages } from 'src/app/shared/functions/getVisiblePages';
import { Car } from 'src/app/shared/interfaces/types';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() items!: Car[] | null;
  @Input() itemsPerPage: number = 6;
  @Input() currentPage: number = 1;
  @Output() changePage = new EventEmitter<Car[]>();

  pager: any = {
    startIndex: 0,
    endIndex: 0,
    totalPages: 1,
  };

  visiblePages: number[] = [];

  ngOnInit() {
    this.setPage(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const items = changes['items'].currentValue;

    this.setPage(this.currentPage);

    this.pager.totalPages = Math.ceil(items.length / this.itemsPerPage);

    this.updateVisiblePages();
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pager.totalPages) {
      this.currentPage = page;
    }

    this.pager.startIndex = (page - 1) * this.itemsPerPage;
    this.pager.endIndex = this.pager.startIndex + this.itemsPerPage;

    const pageOfItems = this.items!.slice(
      this.pager.startIndex,
      this.pager.endIndex
    );

    this.changePage.emit(pageOfItems);

    this.updateVisiblePages();
  }

  updateVisiblePages() {
    this.visiblePages = getVisiblePages(
      this.pager.totalPages,
      this.currentPage
    );
  }
}
