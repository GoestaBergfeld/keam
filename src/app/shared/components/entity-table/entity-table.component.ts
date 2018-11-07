import { ConfirmationModalComponent } from './../confirmation-modal/confirmation-modal.component';
import { EntityTableStruct, EntityTableColumn } from './../../entities/entity-table.model';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BaseEntityService } from '../../entities';
import { OnInit } from '@angular/core';

export abstract class EntityTableComponent<T> implements OnInit {

  // entityTableStruct: EntityTableStruct<T>;  // make this obsolete
  items: T[];

  dataSource: MatTableDataSource<T>;
  displayedColumns: string[];
  entityTableColumns: EntityTableColumn[];

  constructor(private service: BaseEntityService<T>, private editDialog: any, public dialog: MatDialog) {
  }

  onInitDataSource(paginator: MatPaginator, sort: MatSort) {
    this.dataSource = new MatTableDataSource<T>();
    this.dataSource.paginator = paginator || null;
    this.dataSource.sort = sort || null;
  }

  onInitColumns(columns: EntityTableColumn[]) {
    this.displayedColumns = columns.map(col => col.Name);
  }

  ngOnInit() {
    this.service.collection$.subscribe(items => {
      this.items = items;
      this.onChange();
    });
    this.onLoad();
  }

  onLoad() {
    this.service.getAll();
  }

  onRefresh() {
    this.service.getAll(true);
  }

  onAdd(): void {
    this.onEdit({} as T);
  }

  onEdit(data: any): void {
    const dialogRef = this.dialog.open(this.editDialog, {
      data: data,
      height: '80vh',
      width: '90vw'
    });

    dialogRef.afterClosed().subscribe((response: T) => {
      if (response) {
        this.service.upsert(response);
      }
    });
  }

  onDelete(obj: T) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete',
        text: 'Are you sure to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.service.delete(obj['Id']);
      }
    });
  }

  onChange() {
    this.dataSource.data = (this.items) ? this.items : [];
  }

}
