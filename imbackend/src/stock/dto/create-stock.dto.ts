import { Stock } from '../entities/stock.entity';
import { IsArray, IsString, ValidateNested, ArrayMinSize, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class StockItemModel {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class CreateStockDto extends Stock {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StockItemModel)
  itemModel: StockItemModel[];
}
