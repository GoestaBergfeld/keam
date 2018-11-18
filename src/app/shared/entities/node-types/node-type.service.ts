import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { NodeType } from './node-type.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class NodeTypeService extends BaseEntityService<NodeType> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('odata/nodetypes', httpClient, notificationService);
  }

}
