import { NodeAttribute } from './../../models/NodeAttribute.model';

import { BaseEntity } from '../base-entity.model';
import { NodeTypeEnum } from '../../enums/NodeType.enum';

export interface Node extends BaseEntity {
  Name: string;
  Description: string;
  NodeType: NodeTypeEnum;
  NodeAttributes: NodeAttribute[];
}

