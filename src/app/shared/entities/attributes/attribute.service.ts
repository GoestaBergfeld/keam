import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { Attribute } from './attribute.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class AttributeService extends BaseEntityService<Attribute> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('api/attributes', httpClient, notificationService);
  }

}
