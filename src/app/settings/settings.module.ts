import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/glob';

import { SettingsRoutingModule } from './settings-routing.module';

import { AttributesComponent } from './attributes/attributes.component';
import { AttributeEditModalComponent } from './attributes/attribute-edit-modal/attribute-edit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  declarations: [
    AttributesComponent,
    AttributeEditModalComponent
  ],
  entryComponents: [
    AttributeEditModalComponent
  ]
})
export class SettingsModule { }
