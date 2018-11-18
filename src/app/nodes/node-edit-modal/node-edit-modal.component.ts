import { RelationService } from './../../shared/entities/relations/relation.service';
import { NodeAttribute } from './../../shared/entities/node-attributes/node-attribute.model';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConfirmationModalComponent } from '@shared/components';
import { Relation, Attribute, Node, RelationType } from '@shared/entities';

import { RelationEditModalComponent } from '../relation-edit-modal/relation-edit-modal.component';

@Component({
  selector: 'app-node-edit-modal',
  templateUrl: './node-edit-modal.component.html',
  styleUrls: ['./node-edit-modal.component.scss']
})

export class NodeEditModalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  node: Node;
  nodeTypeId: number;
  attributes: Attribute[];
  relations: Relation[];
  nodes: Node[];
  relationsPrepared = false;
  relationTypes: RelationType[];

  nodeForm = new FormGroup({
    Name: new FormControl(Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(160)])),
    Description: new FormControl(),
  });

  displayedColumns: string[] = ['StartNode.Name', 'EndNode.Name', 'RelationType', 'Description', 'Actions'];
  dataSource: MatTableDataSource<Relation>;

  constructor(
    public dialogRef: MatDialogRef<NodeEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private relationService: RelationService) {
    this.node = data.node;
    this.node.NodeAttributes = this.node.NodeAttributes || [];
    this.nodeTypeId = data.nodeTypeId;
    this.attributes = data.attributes.filter(p => p.AttributeNodeTypes.map(x => x.NodeTypeId).indexOf(data.nodeTypeId) > -1);
    this.attributes.forEach(attribute => {
      this.nodeForm.addControl(attribute.Name, new FormControl());
      const nodeAttribute = this.node.NodeAttributes.find(p => p.AttributeId === attribute.Id);
      if (nodeAttribute) {
        this.nodeForm.get(attribute.Name).setValue(nodeAttribute.Value);
      }
    });
    this.nodes = data.nodes;
    this.relationTypes = data.relationTypes;
    this.nodeForm.get('Name').setValue(this.node.Name);
    this.nodeForm.get('Description').setValue(this.node.Description);
  }

  private buildRelationData() {
    const startRelations = [];
    this.node.StartRelations.forEach(relation => {
      relation.StartNode = this.nodes.find(p => p.Id === relation.StartNodeId);
      relation.EndNode = this.nodes.find(p => p.Id === relation.EndNodeId);
      relation.RelationType = this.relationTypes.find(p => p.Id === relation.RelationTypeId);
      if (relation.StartNodeId === this.node.Id || relation.EndNodeId === this.node.Id) {
        startRelations.push(relation);
      }
    });

    const endRelations = [];
    this.node.EndRelations.forEach(relation => {
      relation.StartNode = this.nodes.find(p => p.Id === relation.StartNodeId);
      relation.EndNode = this.nodes.find(p => p.Id === relation.EndNodeId);
      relation.RelationType = this.relationTypes.find(p => p.Id === relation.RelationTypeId);
      if (relation.StartNodeId === this.node.Id || relation.EndNodeId === this.node.Id) {
        endRelations.push(relation);
      }
    });
    this.dataSource.data = startRelations.concat(endRelations);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Relation>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.buildRelationData();
  }

  onSave() {
    this.node.Name = this.nodeForm.get('Name').value;
    this.node.Description = this.nodeForm.get('Description').value;
    this.node.NodeTypeId = this.node.NodeTypeId || this.nodeTypeId;

    const nodeAttributes = [];
    this.attributes.forEach(attribute => {
      const nodeAttribute = this.node.NodeAttributes.find(p => p.NodeId === this.node.Id && p.AttributeId === attribute.Id);
      nodeAttributes.push(
        {
          Id: (nodeAttribute) ? nodeAttribute.Id : 0,
          AttributeId: attribute.Id,
          NodeId : this.node.Id,
          Value: this.nodeForm.get(attribute.Name).value
        } as NodeAttribute
      );
    });
    this.node.NodeAttributes = nodeAttributes;

    this.dialogRef.close(this.node);
  }

  onAddRelation() {
    const newRelation: Relation = {
      Id: null,
      StartNodeId: this.node.Id,
      EndNodeId: null,
      RelationTypeId: null,
      Description: ''
    };
    this.onEditRelation(newRelation);
  }

  onEditRelation(relation: Relation): void {
    const dialogRef = this.dialog.open(RelationEditModalComponent, {
      data: {
        relation: relation,
        nodes: this.nodes,
        relationTypes: this.relationTypes
      },
      height: '80vh',
      width: '90vw'
    });

    dialogRef.afterClosed().subscribe((response: Relation) => {
      if (response) {
        this.relationService.upsert(response);
        this.buildRelationData();
      }
    });
  }

  onDeleteRelation(relation: Relation) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete Relation',
        text: 'Are you sure to delete this relation.'
      }
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.relationService.delete(relation.Id);
        this.buildRelationData();
      }
    });
  }

  onRefreshRelations() {
    this.relationService.getAll(true, '$expand=StartNode,EndNode,RelationType');
    this.buildRelationData();
  }

}
