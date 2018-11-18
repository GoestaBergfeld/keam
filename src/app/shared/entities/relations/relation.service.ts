import { HttpClient } from '@angular/common/http';
import { BaseEntityService } from './../base-entity.service';
import { Injectable } from '@angular/core';
import { Relation } from './relation.model';
import { NotificationService } from '../../notification.service';

@Injectable()
export class RelationService extends BaseEntityService<Relation> {

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super('odata/relations', httpClient, notificationService);
  }

}
