import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RelationType } from '@shared/entities';

@Component({
  selector: 'app-relation-type-edit-modal',
  templateUrl: './relation-type-edit-modal.component.html',
  styleUrls: ['./relation-type-edit-modal.component.scss']
})

export class RelationTypeEditModalComponent implements OnInit {

  relationType: RelationType;

  relationTypeForm = new FormGroup({
    Name: new FormControl(Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(160)])),
    Description: new FormControl(),
  });

  constructor(public dialogRef: MatDialogRef<RelationTypeEditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.relationType = data.relationType;
    this.relationTypeForm.get('Name').setValue(this.relationType.Name);
    this.relationTypeForm.get('Description').setValue(this.relationType.Description);
  }

  ngOnInit() {
  }

  onSave() {
    this.relationType.Name = this.relationTypeForm.get('Name').value;
    this.relationType.Description = this.relationTypeForm.get('Description').value;
    this.dialogRef.close(this.relationType);
  }
}
