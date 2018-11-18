
import { BaseEntity } from '../base-entity.model';
import { AttributeDataType } from '../../enums/AttributeDataType.enum';
import { AttributeNodeType } from '../attribute-node-types/attribute-node-type.model';
import { NodeAttribute } from './../node-attributes/node-attribute.model';

export interface Attribute extends BaseEntity {
  Name: string;
  Description: string;
  DataType: AttributeDataType;
  Required: boolean;
  MultipleAllowed: boolean;
  AttributeNodeTypes: AttributeNodeType[];
  NodeAttributes: NodeAttribute[];
  GetValue(item: any): any;
}
