import { Stock, StockItem } from '../entities/stock.entity';

import { IsArray, IsObject } from 'class-validator';

export class CreateItemDto  {
  @IsObject()
  item: [];
}
