import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Relation, Node, RelationType } from '@shared/entities';

@Component({
  selector: 'app-relation-edit-modal',
  templateUrl: './relation-edit-modal.component.html',
  styleUrls: ['./relation-edit-modal.component.scss']
})

export class RelationEditModalComponent implements OnInit {

  relation: Relation;
  nodes: Node[];
  relationTypes: RelationType[];

  relationForm = new FormGroup({
    StartNodeId: new FormControl(),
    EndNodeId: new FormControl(),
    RelationTypeId: new FormControl(),
    Description: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<RelationEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.relation = data.relation;
    this.relationTypes = data.relationTypes;
    this.nodes = data.nodes;
    this.relationForm.get('StartNodeId').setValue(this.relation.StartNodeId);
    this.relationForm.get('EndNodeId').setValue(this.relation.EndNodeId);
    this.relationForm.get('RelationTypeId').setValue(this.relation.RelationTypeId);
    this.relationForm.get('Description').setValue(this.relation.Description);
  }

  ngOnInit() {
  }

  onSave() {
    this.relation.StartNodeId = this.relationForm.get('StartNodeId').value;
    this.relation.EndNodeId = this.relationForm.get('EndNodeId').value;
    this.relation.RelationTypeId = this.relationForm.get('RelationTypeId').value;
    this.relation.Description = this.relationForm.get('Description').value;
    this.dialogRef.close(this.relation);
  }
}
