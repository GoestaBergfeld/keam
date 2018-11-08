import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Attribute } from '@shared/entities';
import { AttributeDataType } from '@shared/enums';

@Component({
  selector: 'app-attribute-edit-modal',
  templateUrl: './attribute-edit-modal.component.html',
  styleUrls: ['./attribute-edit-modal.component.scss']
})

export class AttributeEditModalComponent implements OnInit {

  attribute: Attribute;
  dataTypes = AttributeDataType;

  attributeForm = new FormGroup({
    Name: new FormControl(Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(160)])),
    Description: new FormControl(),
    DataType: new FormControl(),
    Required: new FormControl(),
    MultipleAllowed: new FormControl(),
    AllowedNodeTypes: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<AttributeEditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.attribute = data.attribute;
    this.attributeForm.get('Name').setValue(this.attribute.Name);
    this.attributeForm.get('Description').setValue(this.attribute.Description);
    this.attributeForm.get('DataType').setValue(this.attribute.DataType);
    this.attributeForm.get('Required').setValue(this.attribute.Required);
    this.attributeForm.get('MultipleAllowed').setValue(this.attribute.MultipleAllowed);
    this.attributeForm.get('AllowedNodeTypeIds').setValue(this.attribute.AllowedNodeTypeIds);
  }

  ngOnInit() {
  }

  onSave() {
    this.attribute.Name = this.attributeForm.get('Name').value;
    this.attribute.Description = this.attributeForm.get('Description').value;
    this.attribute.DataType = this.attributeForm.get('DataType').value;
    this.attribute.Required = this.attributeForm.get('Required').value;
    this.attribute.MultipleAllowed = this.attributeForm.get('MultipleAllowed').value;
    this.attribute.AllowedNodeTypeIds = this.attributeForm.get('AllowedNodeTypeIds').value;
    this.dialogRef.close(this.attribute);
  }
}
