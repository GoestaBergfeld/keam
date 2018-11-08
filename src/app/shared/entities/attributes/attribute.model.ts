
import { BaseEntity } from '../base-entity.model';
import { AttributeDataType } from '../../enums/AttributeDataType.enum';

export interface Attribute extends BaseEntity {
  Name: string;
  Description: string;
  DataType: AttributeDataType;
  Required: boolean;
  MultipleAllowed: boolean;
  AllowedNodeTypeIds: number[];
}
