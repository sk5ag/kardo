import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface PrescriptionTableItem {
  name: string;
  id: number;
  amount:number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PrescriptionTableItem[] = [
  {id: 1, name: 'Hydrogen', amount:10},
  {id: 2, name: 'Helium', amount:10},
  {id: 3, name: 'Lithium', amount:20},
  {id: 4, name: 'Beryllium', amount:22},
  {id: 5, name: 'Boron', amount:11},
  {id: 6, name: 'Carbon', amount:11},
  {id: 7, name: 'Nitrogen', amount:15},
  {id: 8, name: 'Oxygen', amount:15},
  {id: 9, name: 'Fluorine', amount:16},
  {id: 10, name: 'Neon', amount:19},
  {id: 11, name: 'Sodium', amount:30},
  {id: 12, name: 'Magnesium', amount:29},
  {id: 13, name: 'Aluminum', amount:10},
  {id: 14, name: 'Silicon', amount:12},
  {id: 15, name: 'Phosphorus', amount:80},
  {id: 16, name: 'Sulfur', amount:43},
  {id: 17, name: 'Chlorine', amount:50},
  {id: 18, name: 'Argon', amount:81},
  {id: 19, name: 'Potassium', amount:40},
  {id: 20, name: 'Calcium', amount:62},
  {id: 21, name: 'A', amount:19},
  {id: 22, name: 'B', amount:30},
  {id: 23, name: 'C', amount:29},
  {id: 24, name: 'D', amount:10},
  {id: 25, name: 'E', amount:12},
  {id: 26, name: 'F', amount:80},
  {id: 27, name: 'G', amount:43},
  {id: 28, name: 'H', amount:50},
  {id: 29, name: 'I', amount:81},
  {id: 30, name: 'J', amount:40},
  {id: 31, name: 'K', amount:62},
];

/**
 * Data source for the PrescriptionTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PrescriptionTableDataSource extends DataSource<PrescriptionTableItem> {
  data: PrescriptionTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PrescriptionTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PrescriptionTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PrescriptionTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'amount': return compare(+a.amount, +b.amount, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
