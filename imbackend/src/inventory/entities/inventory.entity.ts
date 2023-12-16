export class Inventory {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type InvertoryDocument = Invertory & Document;

@Schema()
export class Invertory {
  @Prop({ required: true, unique: true })
  inventoryName: string;


  @Prop({ required: true })
  item:object
  
  @Prop({ required: true })
  lastUpdate: string;
}

export const UserSchema = SchemaFactory.createForClass(Invertory);
