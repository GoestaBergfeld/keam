import { BaseEntity } from '../base-entity.model';
import { Node } from './../nodes/node.model';

export interface Relation extends BaseEntity {
  StartNodeId: number;
  StartNode?: Node;
  EndNodeId: number;
  EndNode?: Node;
  RelationTypeId: number;
  Description: string;
}
