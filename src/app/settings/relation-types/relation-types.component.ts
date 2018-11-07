import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';

import { RelationType } from '@shared/entities';
import { EntityTableComponent } from '@shared/components';
import { RelationTypeService } from '@shared/entities';
import { EntityTableStruct } from 'src/app/shared/entities/entity-table.model';
import { RelationTypeEditModalComponent } from './relation-type-edit-modal/relation-type-edit-modal.component';
// import { AttributeEditModalComponent } from './attribute-edit-modal/attribute-edit-modal.component';

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

  onChange() {
    this.entityTableStruct.dataSource.data = (this.items) ? this.items : [];
  }

  ngOnInit(): void {
    this.entityTableStruct = new EntityTableStruct<RelationType>(this.paginator, this.sort, []);
    this.relationTypeService.collection$.subscribe(relationTypes => {
      this.items = relationTypes;
      this.onChange();
    });
    this.onLoad();
  }

  onEdit(relationType: RelationType): void {
    super.onEdit({
      relationType: relationType
    });
  }

}
