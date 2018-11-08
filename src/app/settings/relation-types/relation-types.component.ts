import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { RelationType } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { RelationTypeService } from '@shared/entities';
import { RelationTypeEditModalComponent } from './relation-type-edit-modal/relation-type-edit-modal.component';
import { AttributeDataType } from '@shared/enums';

@Component({
  selector: 'app-relation-types',
  templateUrl: './relation-types.component.html',
  styleUrls: ['./relation-types.component.scss']
})
export class RelationTypesComponent extends EntityTableComponent<RelationType> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private relationTypeService: RelationTypeService
  ) {
    super(relationTypeService, RelationTypeEditModalComponent, dialog);
  }

  ngOnInit(): void {
    super.onInitDataSource(this.paginator, this.sort);
    super.ngOnInit();
  }

  onEdit(relationType: RelationType): void {
    super.onEdit({
      relationType: relationType
    });
  }

}
