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
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/core/services/api/state.service';
import { LIMIT_ITEMS } from 'src/app/shared/constants';
import { getVisiblePages } from 'src/app/shared/functions/getVisiblePages';
import { Car, PagerType } from 'src/app/shared/interfaces/types';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() items!: Car[] | null;

  @Input() currentPage: number = 1;

  @Output() changePage = new EventEmitter<Car[]>();

  pager: PagerType = {
    startIndex: 0,
    endIndex: 0,
    totalItems: 1,
    maxPages: 1,
  };
  visiblePages: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const numberPage = params.get('page');
      if (numberPage) this.currentPage = parseInt(numberPage);
    });
  }

  ngOnInit() {
    this.stateService.currentGarage$.subscribe((data: Car[]) => {
      this.pager.totalItems = data.length;

      this.pager.maxPages = Math.ceil(data.length / LIMIT_ITEMS);

      this.items = data;

      this.setPage(this.currentPage);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const items = changes['items'].currentValue;

    this.setPage(this.currentPage);

    this.pager.totalItems = items.length;

    this.updateVisiblePages();
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pager.maxPages) {
      this.currentPage = page;

      this.sortItems(page);

      this.updateVisiblePages();

      this.updateQueryParams();
    }
  }

  updateVisiblePages() {
    this.visiblePages = getVisiblePages(this.pager.maxPages, this.currentPage);
    if (this.items)
      this.pager.maxPages = Math.ceil(this.items.length / LIMIT_ITEMS);
  }

  sortItems(page: number) {
    this.pager.startIndex = (page - 1) * LIMIT_ITEMS;
    this.pager.endIndex = this.pager.startIndex + LIMIT_ITEMS;

    const pageOfItems = this.items!.slice(
      this.pager.startIndex,
      this.pager.endIndex
    );

    this.changePage.emit(pageOfItems);
  }

  updateQueryParams() {
    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }
}
