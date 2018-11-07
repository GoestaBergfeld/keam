import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { combineLatest } from 'rxjs';

import { NodeService, Attribute, Node, AttributeService } from '@shared/entities';
import { NodeTypeEnum } from '@shared/enums';
import { EntityTableComponent } from '@shared/components';

import { NodeEditModalComponent } from '../node-edit-modal/node-edit-modal.component';

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

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.onInitColumns(['Name', 'Description', 'Actions']);
    // super.ngOnInit();
    combineLatest(this.nodeService.collection$, this.attributeService.collection$).subscribe(data => {
      if (data[0] && data[1]) {
        this.items = <Node[]>data[0];
        this.attributes = data[1];
        this.onChange();
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

  onChange() {
    // this.onPrepareTable();
    this.dataSource.data = (this.items) ? this.items.filter(p => p.NodeType === this.nodeType) : [];
  }

  // onPrepareTable() {
  //   this.entityTableStruct = new EntityTableStruct<Node>(
  //     this.paginator,
  //     this.sort,
  //     this.attributes.filter(p => p.AllowedNodeTypes.indexOf(this.nodeType) > -1).map(attribute => attribute.Name)
  //   );
  // }

}
