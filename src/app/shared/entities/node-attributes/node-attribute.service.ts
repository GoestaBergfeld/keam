import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { NodeAttribute } from './node-attribute.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class NodeAttributeService extends BaseEntityService<NodeAttribute> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('odata/nodeattributes', httpClient, notificationService);
  }

}
