import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { AttributeNodeType } from './attribute-node-type.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class AttributeNodeTypeService extends BaseEntityService<AttributeNodeType> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('odata/attribute-node-types', httpClient, notificationService);
  }

}
