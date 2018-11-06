import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NodesComponent } from './nodes/nodes.component';
import { NodeComponent } from './node/node.component';
// import { NodeCollectionResolver } from '../shared/entities/nodes/node.service';

const routes: Routes = [
  {
    path: ':id',
    component: NodeComponent
  },
  {
    path: '',
    component: NodesComponent,
    // resolve: {
    //   nodes: NodeCollectionResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodesRoutingModule { }
