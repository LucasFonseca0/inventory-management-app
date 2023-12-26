import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

interface StockItemModel {
  key: string;
  type: string;
}
export interface StockItem {
  [key: string]: any;
}

@Schema()
export class Stock {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    required: true,
    type: [Object],
  })
  itemModel: StockItemModel[];

  @Prop({
    required: true,
    type: [Object],
  })
  items: StockItem[];

  @Prop({ required: true })
  lastUpdate: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
