import { BaseEntity } from '../base-entity.model';

export interface NodeAttribute extends BaseEntity {
  NodeId: number;
  AttributeId: number;
  Value: any;
}
