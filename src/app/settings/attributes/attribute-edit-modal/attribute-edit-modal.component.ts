import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Attribute, NodeTypeService, NodeType, AttributeNodeType } from '@shared/entities';
import { AttributeDataType } from '@shared/enums';

@Component({
  selector: 'app-attribute-edit-modal',
  templateUrl: './attribute-edit-modal.component.html',
  styleUrls: ['./attribute-edit-modal.component.scss']
})

export class AttributeEditModalComponent implements OnInit {

  attribute: Attribute;
  dataTypes = AttributeDataType;
  nodeTypes: NodeType[] = [];
  attributeNodeTypes: AttributeNodeType[];

  attributeForm = new FormGroup({
    Name: new FormControl(Validators.required, Validators.compose([Validators.minLength(3), Validators.maxLength(160)])),
    Description: new FormControl(),
    DataType: new FormControl(),
    Required: new FormControl(),
    MultipleAllowed: new FormControl(),
    AttributeNodeTypes: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<AttributeEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.attribute = data.attribute;
    this.nodeTypes = data.nodeTypes;
    this.attributeForm.get('Name').setValue(this.attribute.Name);
    this.attributeForm.get('Description').setValue(this.attribute.Description);
    this.attributeForm.get('DataType').setValue(this.attribute.DataType);
    this.attributeForm.get('Required').setValue(this.attribute.Required);
    this.attributeForm.get('MultipleAllowed').setValue(this.attribute.MultipleAllowed);
    // this.attributeForm.get('AttributeNodeTypes').setValue(this.attribute.AttributeNodeTypes);
    this.attributeNodeTypes = (this.attribute.AttributeNodeTypes) ? this.attribute.AttributeNodeTypes.slice() : [];
    this.nodeTypes.forEach(nodeType => {
      const idx = this.attributeNodeTypes.findIndex(p => p.NodeTypeId === nodeType.Id);
      if (idx === -1) {
        this.attributeNodeTypes.push({
         AttributeId: this.attribute.Id,
         NodeTypeId: nodeType.Id,
         Attribute: this.attribute,
         NodeType: nodeType
        } as AttributeNodeType);
      } else {
        this.attributeNodeTypes[idx].NodeType = nodeType;
      }
    });
    this.attributeForm.get('AttributeNodeTypes').setValue(this.attribute.AttributeNodeTypes);
  }

  ngOnInit() {
  }

  onSave() {
    this.attribute.Name = this.attributeForm.get('Name').value;
    this.attribute.Description = this.attributeForm.get('Description').value;
    this.attribute.DataType = this.attributeForm.get('DataType').value;
    this.attribute.Required = this.attributeForm.get('Required').value;
    this.attribute.MultipleAllowed = this.attributeForm.get('MultipleAllowed').value;
    this.attribute.AttributeNodeTypes = [];
    const selectedAttributeNodeTypes = <AttributeNodeType[]>this.attributeForm.get('AttributeNodeTypes').value || [];
    selectedAttributeNodeTypes.forEach(selectedAttributeNodeType => {
      this.attribute.AttributeNodeTypes.push({
        Id: selectedAttributeNodeType.Id,
        AttributeId: selectedAttributeNodeType.AttributeId,
        NodeTypeId: selectedAttributeNodeType.NodeTypeId
      });
    });
    // console.log(this.attribute);
    this.dialogRef.close(this.attribute);
  }
}
