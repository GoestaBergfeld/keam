import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { RelationType } from './relation-type.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class RelationTypeService extends BaseEntityService<RelationType> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('api/relation-types', httpClient, notificationService);
  }

}
