import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { Attribute, NodeTypeService, NodeType } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { AttributeService } from '@shared/entities';
import { EntityTableStruct } from 'src/app/shared/entities/entity-table.model';
import { AttributeEditModalComponent } from './attribute-edit-modal/attribute-edit-modal.component';
import { AttributeDataType } from '@shared/enums';
import { combineLatest } from 'rxjs';

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
      Name: 'AllowedNodeTypes',
      DataType: AttributeDataType.OneLineText,
    }
  ] as Attribute[];

  // nodeTypes: NodeType[];

  constructor(
    public dialog: MatDialog,
    private attributeService: AttributeService,
    private nodeTypeService: NodeTypeService
  ) {
    super(attributeService, AttributeEditModalComponent, dialog);
  }

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.onInitColumns(this.defaultColumns);
    // super.ngOnInit();
    combineLatest(this.attributeService.collection$, this.nodeTypeService.collection$).subscribe(data => {
      if (data[0] && data[1]) {
        this.items = <Attribute[]>data[0];
        this.items.forEach(item => {
          item.AllowedNodeTypes = [];
          item.AllowedNodeTypeIds.forEach(nodeTypeId => {
            item.AllowedNodeTypes.push(data[1].find(p => p.Id === nodeTypeId).Name);
          });
        });
        this.onChange();
      }
    });
    this.onLoad();
    this.nodeTypeService.getAll();
  }

  onEdit(attribute: Attribute): void {
    super.onEdit({
      attribute: attribute
    });
  }

}
