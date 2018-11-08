import { NodeAttribute } from './../../models/NodeAttribute.model';

import { BaseEntity } from '../base-entity.model';

export interface Node extends BaseEntity {
  Name: string;
  Description: string;
  NodeTypeId: number;
  NodeAttributes: NodeAttribute[];
}

