import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export class EntityTableStruct<T> {

  dataSource: MatTableDataSource<T>;
  displayedColumns: string[];

  constructor(paginator?: MatPaginator, sort?: MatSort, columns?: string[]) {
    this.dataSource = new MatTableDataSource<T>();
    this.dataSource.paginator = paginator || null;
    this.dataSource.sort = sort || null;
    const _columns = ['Name', 'Description'];
    if (columns) {
      columns.forEach(column => {
        _columns.push(column);
      });
    }
    _columns.push('Actions');
    this.displayedColumns = _columns;
  }

}
