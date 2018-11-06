import { ConfirmationModalComponent } from './../confirmation-modal/confirmation-modal.component';
import { EntityTableStruct } from './../../entities/entity-table.model';
import { MatDialog } from '@angular/material';
import { BaseEntityService } from '../../entities';

export abstract class EntityTableComponent<T> {

  entityTableStruct: EntityTableStruct<T>;
  items: T[];

  constructor(private service: BaseEntityService<T>, private editDialog: any, public dialog: MatDialog) {
    this.entityTableStruct = new EntityTableStruct();
    this.entityTableStruct.dataSource.data = [];
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

}
