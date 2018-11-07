import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NodeType } from '@shared/entities';

@Component({
  selector: 'app-node-type-edit-modal',
  templateUrl: './node-type-edit-modal.component.html',
  styleUrls: ['./node-type-edit-modal.component.scss']
})

export class NodeTypeEditModalComponent implements OnInit {

  nodeType: NodeType;

  nodeTypeForm = new FormGroup({
    Name: new FormControl(Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(160)])),
    Description: new FormControl(),
  });

  constructor(public dialogRef: MatDialogRef<NodeTypeEditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nodeType = data.nodeType;
    this.nodeTypeForm.get('Name').setValue(this.nodeType.Name);
    this.nodeTypeForm.get('Description').setValue(this.nodeType.Description);
  }

  ngOnInit() {
  }

  onSave() {
    this.nodeType.Name = this.nodeTypeForm.get('Name').value;
    this.nodeType.Description = this.nodeTypeForm.get('Description').value;
    this.dialogRef.close(this.nodeType);
  }
}
