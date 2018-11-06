import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { Attribute } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { AttributeService } from '@shared/entities';
import { EntityTableStruct } from 'src/app/shared/entities/entity-table.model';
import { AttributeEditModalComponent } from './attribute-edit-modal/attribute-edit-modal.component';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent extends EntityTableComponent<Attribute> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    super(attributeService, AttributeEditModalComponent, dialog);
  }

  onChange() {
    this.entityTableStruct.dataSource.data = (this.items) ? this.items : [];
  }

  ngOnInit(): void {
    this.entityTableStruct = new EntityTableStruct<Attribute>(this.paginator, this.sort, ['DataType', 'Required', 'MultipleAllowed', 'AllowedNodeTypes']);
    this.attributeService.collection$.subscribe(attributes => {
      this.items = attributes;
      this.onChange();
    });
    this.onLoad();
  }

  onEdit(attribute: Attribute): void {
    super.onEdit({
      attribute: attribute
    });
  }

}
