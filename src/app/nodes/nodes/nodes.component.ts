import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';

import { NodeService, Attribute, Node, AttributeService, NodeTypeService, NodeType, NodeAttribute, RelationType, RelationTypeService } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';

import { NodeEditModalComponent } from '../node-edit-modal/node-edit-modal.component';
import { AttributeDataType } from '@shared/enums';
import { NodeAttributeService } from 'src/app/shared/entities/node-attributes/node-attribute.service';

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
  nodeAttributes: NodeAttribute[];
  relationTypes: RelationType[] = [];

  selectedNodeType: NodeType;

  tableDataLoaded = false;

  constructor(
    public dialog: MatDialog,
    private nodeService: NodeService,
    private attributeService: AttributeService,
    private nodeTypeService: NodeTypeService,
    private nodeAttributeService: NodeAttributeService,
    private relationTypeService: RelationTypeService
  ) {
    super(nodeService, NodeEditModalComponent, dialog);
  }

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.onInitColumns();
    combineLatest(
      this.nodeService.collection$,
      this.attributeService.collection$,
      this.nodeTypeService.collection$,
      this.nodeAttributeService.collection$,
      this.relationTypeService.collection$)
    .subscribe(data => {
      if (data[0] && data[1] && data[2] && data[3] && data[4]) {
        this.items = <Node[]>data[0];
        this.attributes = data[1];
        this.nodeTypes = data[2];
        this.nodeAttributes = data[3];
        this.relationTypes = data[4];
        if (data[2].length > 0) {
          this.selectedNodeType = data[2][0];
        }
        this.tableDataLoaded = true;
        this.onChange();
      }
    });
    this.onLoad('$orderby=Name&$expand=NodeAttributes,StartRelations,EndRelations');
    this.attributeService.getAll(false, '$expand=AttributeNodeTypes');
    this.nodeTypeService.getAll();
    this.nodeAttributeService.getAll();
    this.relationTypeService.getAll();
  }

  onEdit(node: Node): void {
    super.onEdit({
      node: node,
      nodeTypeId: this.selectedNodeType.Id,
      attributes: this.attributes,
      relationTypes: this.relationTypes,
      nodes: this.items
    });
  }

  onChange() {
    this.dataSource.data = (this.items) ? this.items.filter(p => p.NodeTypeId === this.selectedNodeType.Id) : [];
    const nodeTypeAttributes = this.attributes
      .filter(p => p.AttributeNodeTypes.map(x => x.NodeTypeId)
      .indexOf(this.selectedNodeType.Id) > -1);
    nodeTypeAttributes.forEach(nodeTypeAttribute => {
      nodeTypeAttribute.GetValue = (item: any) => {
        const node = <Node>item;
        const nodeAttribute = node.NodeAttributes.find(p => p.AttributeId === nodeTypeAttribute.Id);
        return (nodeAttribute) ? nodeAttribute.Value : '';
      };
    });
    super.onInitColumns(nodeTypeAttributes);
  }

}
