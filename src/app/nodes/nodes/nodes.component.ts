import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { NodeService, Attribute, Node } from '@shared/entities';
import { NodeTypeEnum } from '@shared/enums';

import { NodeEditModalComponent } from '../node-edit-modal/node-edit-modal.component';
import { EntityTableStruct } from 'src/app/shared/entities/entity-table.model';
import { EntityTableComponent } from 'src/app/shared/components/entity-table/entity-table.component';
import { AttributeService } from 'src/app/shared/entities';
import { Observable, forkJoin, of, zip, combineLatest } from 'rxjs';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent extends EntityTableComponent<Node> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  attributes: Attribute[] = [];

  nodeType: NodeTypeEnum = NodeTypeEnum.InformationSystem;
  nodeTypes = NodeTypeEnum;

  constructor(
    public dialog: MatDialog,
    private nodeService: NodeService,
    private attributeService: AttributeService
  ) {
    super(nodeService, NodeEditModalComponent, dialog);
  }

  onChangeNodeType() {
    this.onPrepareTable();
    this.entityTableStruct.dataSource.data = (this.items) ? this.items.filter(p => p.NodeType === this.nodeType) : [];
  }

  onPrepareTable() {
    this.entityTableStruct = new EntityTableStruct<Node>(
      this.paginator,
      this.sort,
      this.attributes.filter(p => p.AllowedNodeTypes.indexOf(this.nodeType) > -1).map(attribute => attribute.Name)
    );
  }

  ngOnInit(): void {
    combineLatest(this.nodeService.collection$, this.attributeService.collection$).subscribe(data => {
      if (data[0] && data[1]) {
        this.items = <Node[]>data[0];
        this.attributes = data[1];
        this.onChangeNodeType();
      }
    });
    this.onLoad();
    this.attributeService.getAll();
  }

  onEdit(node: Node): void {
    super.onEdit({
      node: node,
      nodeType: this.nodeType,
      attributes: this.attributes
    });
  }

}
