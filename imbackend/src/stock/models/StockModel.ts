import { StockItem } from "../entities/stock.entity";

export class StockItemModel {
  key: string;
  type: string;
}
export class CreateStockItemDto {
  [key: string]: any;
}

export class StockModel {
  name: string;

  itemModel: StockItemModel[];

  items: StockItem[];

  lastUpdate: string;
}
