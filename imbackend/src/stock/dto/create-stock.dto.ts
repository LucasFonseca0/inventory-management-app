import { Stock } from '../entities/stock.entity';

import { IsArray, IsString } from 'class-validator';

export class StockItemModel {
  key: string;
  type: string;
}
export class CreateStockDto extends Stock {
  @IsString()
  name: string;
  @IsArray()
  itemModel: StockItemModel[];
}
