import { BaseEntity } from '../entities/base-entity.model';
import { Attribute } from '../entities/attributes/attribute.model';

export interface NodeAttribute extends BaseEntity {
  Attribute: Attribute;
  Value: any;
}
