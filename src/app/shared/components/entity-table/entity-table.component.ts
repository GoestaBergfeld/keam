import { Attribute } from '@shared/entities';
import { ConfirmationModalComponent } from './../confirmation-modal/confirmation-modal.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BaseEntityService } from '../../entities';
import { OnInit } from '@angular/core';
import { AttributeDataType } from '@shared/enums';

export abstract class EntityTableComponent<T> implements OnInit {

  items: T[];

  dataSource: MatTableDataSource<T>;
  columnAttributes: Attribute[];

  private defaultStartColumns = [
    {
      Id: null,
      Name: 'Name',
      Description: '',
      Required: false,
      MultipleAllowed: false,
      AllowedNodeTypeIds: null,
      DataType: AttributeDataType.OneLineText
    },
    {
      Id: null,
      Name: 'Description',
      Description: '',
      Required: false,
      MultipleAllowed: false,
      AllowedNodeTypeIds: null,
      DataType: AttributeDataType.MultiLineText
    }
  ];

  private defaultEndColumns = [
    {
      Id: null,
      Name: 'Actions',
      Description: '',
      Required: false,
      MultipleAllowed: false,
      AllowedNodeTypeIds: null,
      DataType: AttributeDataType.Actions
    }
  ];

  get displayedColumns(): string[] {
    return this.columnAttributes.map(col => col.Name);
  }

  constructor(private service: BaseEntityService<T>, private editDialog: any, public dialog: MatDialog) {
    this.onInitColumns();
  }

  onInitDataSource(paginator: MatPaginator, sort: MatSort) {
    this.dataSource = new MatTableDataSource<T>();
    this.dataSource.paginator = paginator || null;
    this.dataSource.sort = sort || null;
  }

  onInitColumns(columns: Attribute[] = []) {
    this.columnAttributes =
      this.defaultStartColumns
      .concat(columns)
      .concat(this.defaultEndColumns);
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
