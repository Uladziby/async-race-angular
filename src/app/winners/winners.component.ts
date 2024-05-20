import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
})
export class WinnersComponent {
  racers = [
    { number: 1, name: 'Racer One', bestTime: '1:45.67', wins: 3 },
    { number: 2, name: 'Racer Two', bestTime: '1:42.34', wins: 5 },
    { number: 3, name: 'Racer Three', bestTime: '1:50.12', wins: 2 },
    { number: 4, name: 'Racer Four', bestTime: '1:44.22', wins: 4 },
    { number: 5, name: 'Racer Five', bestTime: '1:39.98', wins: 6 },
    { number: 6, name: 'Racer Six', bestTime: '1:41.10', wins: 1 },
    { number: 7, name: 'Racer Seven', bestTime: '1:46.88', wins: 2 },
    { number: 8, name: 'Racer Eight', bestTime: '1:43.50', wins: 3 },
    { number: 9, name: 'Racer Nine', bestTime: '1:47.77', wins: 5 },
    { number: 10, name: 'Racer Ten', bestTime: '1:48.44', wins: 7 },
  ];

  currentPage = 1;
  itemsPerPage = 5;

  get paginatedRacers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.racers.slice(startIndex, endIndex);
  }

  totalPages() {
    return Math.ceil(this.racers.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
