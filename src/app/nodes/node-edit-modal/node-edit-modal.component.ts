import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ConfirmationModalComponent } from '@shared/components';
import { Relation, Attribute, Node } from '@shared/entities';

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

  nodeForm = new FormGroup({
    Name: new FormControl(Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(160)])),
    Description: new FormControl(),
  });

  displayedColumns: string[] = ['StartNode.Name', 'EndNode.Name', 'RelationType', 'Description', 'Actions'];
  dataSource: MatTableDataSource<Relation>;

  constructor(
    public dialogRef: MatDialogRef<NodeEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog) {
    this.node = data.node;
    this.nodeTypeId = data.nodeTypeId;
    this.attributes = data.attributes;
    this.nodeForm.get('Name').setValue(this.node.Name);
    this.nodeForm.get('Description').setValue(this.node.Description);
  }

  private buildRelationData() {
    if (this.relations && this.nodes) {
      const relations = [];
      this.relations.forEach(relation => {
        relation.StartNode = this.nodes.find(p => p.Id === relation.StartNodeId);
        relation.EndNode = this.nodes.find(p => p.Id === relation.EndNodeId);
        if (relation.StartNodeId === this.node.Id || relation.EndNodeId === this.node.Id) {
          relations.push(relation);
        }
      });
      this.dataSource.data = relations;
      this.relationsPrepared = true;
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Relation>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSave() {
    this.node.Name = this.nodeForm.get('Name').value;
    this.node.Description = this.nodeForm.get('Description').value;
    this.node.NodeTypeId = this.node.NodeTypeId || this.nodeTypeId;
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
      },
      height: '80vh',
      width: '90vw'
    });

    dialogRef.afterClosed().subscribe((response: Relation) => {
      // if (response) {
      //   if (!response.Id) {
      //     this.store.dispatch(new relationActions.AddRelation({relation: response}));
      //   } else {
      //     this.store.dispatch(new relationActions.UpdateRelation({relation: response}));
      //   }
      // }
    });
  }

  onDeleteRelation(relation: Relation) {
    // https://brianflove.com/2017/07/17/angular-delete-confirmation/
    // https://github.com/typicode/json-server
    // https://gojs.net/latest/samples/angular.html
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete Relation',
        text: 'Are you sure to delete this relation.'
      }
    });

    dialogRef.afterClosed().subscribe(ok => {
      // if (ok) {
      //   this.store.dispatch(new relationActions.DeleteRelation({id: relation.Id}));
      // }
    });
  }

}
