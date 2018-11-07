import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { NodeType } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { NodeTypeService } from '@shared/entities';
import { EntityTableStruct } from 'src/app/shared/entities/entity-table.model';
import { NodeTypeEditModalComponent } from './node-type-edit-modal/node-type-edit-modal.component';
// import { AttributeEditModalComponent } from './attribute-edit-modal/attribute-edit-modal.component';

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

  onChange() {
    this.entityTableStruct.dataSource.data = (this.items) ? this.items : [];
  }

  ngOnInit(): void {
    this.entityTableStruct = new EntityTableStruct<NodeType>(this.paginator, this.sort, []);
    this.nodeTypeService.collection$.subscribe(nodeTypes => {
      this.items = nodeTypes;
      this.onChange();
    });
    this.onLoad();
  }

  onEdit(nodeType: NodeType): void {
    super.onEdit({
      nodeType: nodeType
    });
  }

}
