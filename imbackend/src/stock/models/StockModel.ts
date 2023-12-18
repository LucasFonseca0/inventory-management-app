
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

  items: CreateStockItemDto[];

  lastUpdate: string;
}
