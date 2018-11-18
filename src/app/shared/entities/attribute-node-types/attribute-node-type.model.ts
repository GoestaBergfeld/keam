import { Attribute, NodeType } from '@shared/entities';

import { BaseEntity } from '../base-entity.model';

export interface AttributeNodeType extends BaseEntity {
  AttributeId: number;
  NodeTypeId: number;
  Attribute?: Attribute;
  NodeType?: NodeType;
}
