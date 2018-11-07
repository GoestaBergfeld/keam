import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/glob';

import { SettingsRoutingModule } from './settings-routing.module';

import { AttributesComponent } from './attributes/attributes.component';
import { AttributeEditModalComponent } from './attributes/attribute-edit-modal/attribute-edit-modal.component';
import { NodeTypesComponent } from './node-types/node-types.component';
import { RelationTypesComponent } from './relation-types/relation-types.component';
import { NodeTypeEditModalComponent } from './node-types/node-type-edit-modal/node-type-edit-modal.component';
import { RelationTypeEditModalComponent } from './relation-types/relation-type-edit-modal/relation-type-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  declarations: [
    AttributesComponent,
    AttributeEditModalComponent,
    NodeTypesComponent,
    NodeTypeEditModalComponent,
    RelationTypesComponent,
    RelationTypeEditModalComponent
  ],
  entryComponents: [
    AttributeEditModalComponent,
    NodeTypeEditModalComponent,
    RelationTypeEditModalComponent
  ]
})
export class SettingsModule { }
