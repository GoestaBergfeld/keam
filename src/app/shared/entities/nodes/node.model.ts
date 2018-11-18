import { NodeType } from './../node-types/node-type.model';
import { Relation } from './../relations/relation.model';
import { NodeAttribute } from './../node-attributes/node-attribute.model';
import { BaseEntity } from '../base-entity.model';

export interface Node extends BaseEntity {
  Name: string;
  Description: string;
  NodeTypeId: number;
  NodeAttributes: NodeAttribute[];
  StartRelations: Relation[];
  EndRelations: Relation[];
  NodeType: NodeType;
}

