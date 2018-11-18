import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { Attribute } from './attribute.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class AttributeService extends BaseEntityService<Attribute> {

  _httpClient: HttpClient;

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('odata/attributes', httpClient, notificationService);
    this._httpClient = httpClient;
  }

  saveAttributeWithSubdata(attribute: Attribute) {
    this._httpClient.post('odata/attributes/PostWithSubdata?$expand=AttributeNodeTypes', {attribute: attribute}).subscribe(response => {
      console.log(response);
    });
  }

}
