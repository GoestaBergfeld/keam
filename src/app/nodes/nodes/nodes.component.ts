import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';

import { NodeService, Attribute, Node, AttributeService, NodeTypeService, NodeType } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';

import { NodeEditModalComponent } from '../node-edit-modal/node-edit-modal.component';
import { AttributeDataType } from '@shared/enums';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent extends EntityTableComponent<Node> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  attributes: Attribute[] = [];
  nodeTypes: NodeType[] = [];

  selectedNodeType: NodeType;

  constructor(
    public dialog: MatDialog,
    private nodeService: NodeService,
    private attributeService: AttributeService,
    private nodeTypeService: NodeTypeService
  ) {
    super(nodeService, NodeEditModalComponent, dialog);
  }

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.onInitColumns();
    combineLatest(this.nodeService.collection$, this.attributeService.collection$, this.nodeTypeService.collection$).subscribe(data => {
      if (data[0] && data[1] && data[2]) {
        this.items = <Node[]>data[0];
        this.attributes = data[1];
        this.nodeTypes = data[2];
        if (data[2].length > 0) {
          this.selectedNodeType = data[2][0];
        }
        this.onChange();
      }
    });
    this.onLoad();
    this.attributeService.getAll();
    this.nodeTypeService.getAll();
  }

  onEdit(node: Node): void {
    super.onEdit({
      node: node,
      nodeTypeId: this.selectedNodeType.Id,
      attributes: this.attributes
    });
  }

  onChange() {
    this.dataSource.data = (this.items) ? this.items.filter(p => p.NodeTypeId === this.selectedNodeType.Id) : [];
    super.onInitColumns(this.attributes.filter(p => p.AllowedNodeTypeIds.indexOf(this.selectedNodeType.Id) > -1));
  }

}
