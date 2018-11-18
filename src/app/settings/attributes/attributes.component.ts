import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { Attribute, NodeTypeService, NodeType } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { AttributeService } from '@shared/entities';
import { EntityTableStruct } from 'src/app/shared/entities/entity-table.model';
import { AttributeEditModalComponent } from './attribute-edit-modal/attribute-edit-modal.component';
import { AttributeDataType } from '@shared/enums';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent extends EntityTableComponent<Attribute> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private defaultColumns = [
    {
      Name: 'DataType',
      DataType: AttributeDataType.Enum,
      Required: true,
      GetValue: (item: any) => {
        return item['DataType'];
      }
    },
    {
      Name: 'Required',
      DataType: AttributeDataType.Boolean,
      GetValue: (item: any) => {
        return item['Required'];
      }
    },
    {
      Name: 'MultipleAllowed',
      DataType: AttributeDataType.Boolean,
      GetValue: (item: any) => {
        return item['MultipleAllowed'];
      }
    }
  ] as Attribute[];

  nodeTypes: NodeType[];

  constructor(
    public dialog: MatDialog,
    private attributeService: AttributeService,
    private nodeTypeService: NodeTypeService
  ) {
    super(attributeService, AttributeEditModalComponent, dialog);
  }

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.onInitColumns(this.defaultColumns);
    // super.ngOnInit();
    combineLatest(this.attributeService.collection$, this.nodeTypeService.collection$).subscribe(data => {
      if (data[0] && data[1]) {
        this.items = <Attribute[]>data[0] || [];
        this.nodeTypes = data[1];
        // this.items.forEach(item => {
        //   item.AttributeNodeTypes = [];
        //   // if (item.AllowedNodeTypeIds) {
        //   //   item.AllowedNodeTypeIds.forEach(nodeTypeId => {
        //   //     item.AllowedNodeTypes.push(data[1].find(p => p.Id === nodeTypeId).Name);
        //   //   });
        //   // }
        // });
        this.onChange();
      }
    });
    this.onLoad('$expand=AttributeNodeTypes');
    this.nodeTypeService.getAll();
  }

  onEdit(attribute: Attribute): void {
    super.onEdit({
      attribute: attribute,
      nodeTypes: this.nodeTypes
    });
    // const dialogRef = this.dialog.open(AttributeEditModalComponent, {
    //   data: {
    //     attribute: attribute,
    //     nodeTypes: this.nodeTypes
    //   },
    //   height: '80vh',
    //   width: '90vw'
    // });

    // dialogRef.afterClosed().subscribe((response: Attribute) => {
    //   if (response) {
    //     this.attributeService.saveAttributeWithSubdata(response);
    //   }
    // });
  }

}
