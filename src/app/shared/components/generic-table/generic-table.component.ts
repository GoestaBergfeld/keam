import { Attribute } from '@shared/entities';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {

  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[];
  @Input() columnAttributes: Attribute[];
  // @Input() firstSticky: boolean;
  // @Input() lastSticky: boolean;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

}
