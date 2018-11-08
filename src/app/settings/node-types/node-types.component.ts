import { AttributeDataType } from '@shared/enums';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { NodeType } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { NodeTypeService } from '@shared/entities';
import { NodeTypeEditModalComponent } from './node-type-edit-modal/node-type-edit-modal.component';

@Component({
  selector: 'app-node-types',
  templateUrl: './node-types.component.html',
  styleUrls: ['./node-types.component.scss']
})
export class NodeTypesComponent extends EntityTableComponent<NodeType> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private nodeTypeService: NodeTypeService
  ) {
    super(nodeTypeService, NodeTypeEditModalComponent, dialog);
  }

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.ngOnInit();
  }

  onEdit(nodeType: NodeType): void {
    super.onEdit({
      nodeType: nodeType
    });
  }

}
