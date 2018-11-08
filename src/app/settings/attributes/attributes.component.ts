import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { Attribute } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { AttributeService } from '@shared/entities';
import { EntityTableStruct } from 'src/app/shared/entities/entity-table.model';
import { AttributeEditModalComponent } from './attribute-edit-modal/attribute-edit-modal.component';
import { AttributeDataType } from '@shared/enums';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent extends EntityTableComponent<Attribute> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private defaultColumns = [
    {
      Name: 'DataType',
      DataType: AttributeDataType.Enum,
      Required: true
    },
    {
      Name: 'Required',
      DataType: AttributeDataType.Boolean,
    },
    {
      Name: 'MultipleAllowed',
      DataType: AttributeDataType.Boolean,
    },
    {
      Name: 'AllowedNodeTypeIds',
      DataType: AttributeDataType.Lookup,
    }
  ] as Attribute[];

  constructor(
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    super(attributeService, AttributeEditModalComponent, dialog);
  }

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.onInitColumns(this.defaultColumns);
    super.ngOnInit();
  }

  onEdit(attribute: Attribute): void {
    super.onEdit({
      attribute: attribute
    });
  }

}
