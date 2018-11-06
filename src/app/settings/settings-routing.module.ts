import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributesComponent } from './attributes/attributes.component';

const routes: Routes = [
  {
    path: 'attributes',
    component: AttributesComponent
  },
  {
    path: 'node-types',
    component: AttributesComponent
  },
  {
    path: 'relation-types',
    component: AttributesComponent
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
