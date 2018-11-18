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

  query: string;

  private defaultStartColumns = [
    {
      Id: null,
      Name: 'Name',
      Description: '',
      Required: false,
      MultipleAllowed: false,
      AttributeNodeTypes: null,
      NodeAttributes: null,
      DataType: AttributeDataType.OneLineText,
      GetValue: (item: any) => {
        return item['Name'];
      }
    },
    {
      Id: null,
      Name: 'Description',
      Description: '',
      Required: false,
      MultipleAllowed: false,
      AttributeNodeTypes: null,
      NodeAttributes: null,
      DataType: AttributeDataType.MultiLineText,
      GetValue: (item: any) => {
        return item['Description'];
      }
    }
  ];

  private defaultEndColumns = [
    {
      Id: null,
      Name: 'Actions',
      Description: '',
      Required: false,
      MultipleAllowed: false,
      AttributeNodeTypes: null,
      NodeAttributes: null,
      DataType: AttributeDataType.Actions,
      GetValue: (item: any) => {}
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

  onLoad(query?: string) {
    this.query = query;
    this.service.getAll(false, query);
  }

  onRefresh() {
    this.service.getAll(true, this.query);
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
        this.service.upsert(response, this.query);
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
        this.service.delete(obj['Id'], this.query);
      }
    });
  }

  onChange() {
    this.dataSource.data = (this.items) ? this.items : [];
  }

}
