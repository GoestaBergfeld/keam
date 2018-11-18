import { BaseEntity } from '../base-entity.model';
import { Node } from './../nodes/node.model';
import { RelationType } from '../relation-types/relation-type.model';

export interface Relation extends BaseEntity {
  StartNodeId: number;
  StartNode?: Node;
  EndNodeId: number;
  EndNode?: Node;
  RelationTypeId: number;
  RelationType?: RelationType;
  Description: string;
}
