import { BaseEntity } from '../base-entity.model';
import { NodeRelationType } from '../../enums/NodeRelationType.enum';
import { Node } from './../nodes/node.model';

export interface Relation extends BaseEntity {
  StartNodeId: number;
  StartNode?: Node;
  EndNodeId: number;
  EndNode?: Node;
  RelationType: NodeRelationType;
  Description: string;
}
