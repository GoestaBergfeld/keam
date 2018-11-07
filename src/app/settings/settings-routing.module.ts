import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributesComponent } from './attributes/attributes.component';
import { NodeTypesComponent } from './node-types/node-types.component';
import { RelationTypesComponent } from './relation-types/relation-types.component';

const routes: Routes = [
  {
    path: 'attributes',
    component: AttributesComponent
  },
  {
    path: 'node-types',
    component: NodeTypesComponent
  },
  {
    path: 'relation-types',
    component: RelationTypesComponent
  },
  {
    path: '',
    component: AttributesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
