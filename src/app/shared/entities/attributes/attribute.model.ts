
import { BaseEntity } from '../base-entity.model';
import { AttributeDataType } from '../../enums/AttributeDataType.enum';
import { NodeTypeEnum } from '../../enums/NodeType.enum';

export interface Attribute extends BaseEntity {
  Name: string;
  Description: string;
  DataType: AttributeDataType;
  Required: boolean;
  MultipleAllowed: boolean;
  AllowedNodeTypes: NodeTypeEnum[];
}
