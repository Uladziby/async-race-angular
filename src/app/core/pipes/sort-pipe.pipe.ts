import { Pipe, PipeTransform } from '@angular/core';
import { WinnersTableType } from 'src/app/shared/interfaces/types';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(
    obj: WinnersTableType[] | null,
    order: string,
    orderBy: string
  ): WinnersTableType[] | null {
    if (!obj) {
      return null;
    }
    return obj.sort((a, b) => {
      if (orderBy === 'wins') {
        return this.sortByWins(a, b, order);
      } else if (orderBy === 'bestTime') {
        return this.sortByTime(a, b, order);
      }
      return 0;
    });
  }

  sortByWins(a: WinnersTableType, b: WinnersTableType, order: string) {
    if (order === 'ASC') {
      return a.wins - b.wins;
    } else if (order === 'DESC') {
      return b.wins - a.wins;
    }
    return 0;
  }

  sortByTime(a: WinnersTableType, b: WinnersTableType, order: string) {
    if (order === 'ASC') {
      return a.bestTime - b.bestTime;
    } else if (order === 'DESC') {
      return b.bestTime - a.bestTime;
    }
    return 0;
  }
}
