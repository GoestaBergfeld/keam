import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/glob';

import { NodesRoutingModule } from './nodes-routing.module';
import { NodesComponent } from './nodes/nodes.component';
import { NodeEditModalComponent } from './node-edit-modal/node-edit-modal.component';
import { RelationEditModalComponent } from './relation-edit-modal/relation-edit-modal.component';
import { NodeComponent } from './node/node.component';

@NgModule({
  imports: [
    CommonModule,
    NodesRoutingModule,
    SharedModule
  ],
  declarations: [
    NodesComponent,
    NodeEditModalComponent,
    RelationEditModalComponent,
    NodeComponent
  ],
  entryComponents: [
    NodeEditModalComponent,
    RelationEditModalComponent
  ],
  providers: [],
  exports: [
    NodeEditModalComponent
  ]
})
export class NodesModule { }
