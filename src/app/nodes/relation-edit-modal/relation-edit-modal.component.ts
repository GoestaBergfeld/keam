import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Relation, Node } from '@shared/entities';
import { NodeRelationType } from '@shared/enums';

@Component({
  selector: 'app-relation-edit-modal',
  templateUrl: './relation-edit-modal.component.html',
  styleUrls: ['./relation-edit-modal.component.scss']
})

export class RelationEditModalComponent implements OnInit {

  relation: Relation;
  nodes: Node[];
  relationTypes = NodeRelationType;

  relationForm = new FormGroup({
    StartNodeId: new FormControl(),
    EndNodeId: new FormControl(),
    RelationType: new FormControl(),
    Description: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<RelationEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.relation = data.relation;
    this.relationForm.get('StartNodeId').setValue(this.relation.StartNodeId);
    this.relationForm.get('EndNodeId').setValue(this.relation.EndNodeId);
    this.relationForm.get('RelationType').setValue(this.relation.RelationType);
    this.relationForm.get('Description').setValue(this.relation.Description);
  }

  ngOnInit() {
  }

  onSave() {
    this.relation.StartNodeId = this.relationForm.get('StartNodeId').value;
    this.relation.EndNodeId = this.relationForm.get('EndNodeId').value;
    this.relation.RelationType = this.relationForm.get('RelationType').value;
    this.relation.Description = this.relationForm.get('Description').value;
    this.dialogRef.close(this.relation);
  }
}
