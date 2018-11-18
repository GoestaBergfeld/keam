import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { Node } from './node.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class NodeService extends BaseEntityService<Node> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('odata/nodes', httpClient, notificationService);
  }

}

// @Injectable()
// export class NodeCollectionResolver implements Resolve<boolean> {

//   constructor(private service: NodeService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     this.service.getAll();
//     return this.service.loaded$;
//   }

// }
