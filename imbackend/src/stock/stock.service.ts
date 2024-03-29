import { Injectable, Logger } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockItemModel, StockModel } from './models/StockModel';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stock, StockItem } from './entities/stock.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ObjectId } from 'mongodb';
import validateStockModel from './validations/validateStockModel.validation';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(@InjectModel(Stock.name) private stockModel: Model<StockModel>) {}

  async createNewStock(
    createStockDto: CreateStockDto,

  ): Promise<StockModel> {
    const currentDate = new Date().toString();
    
      const newStock = await this.stockModel.create({
        ...createStockDto,
        items: [],
        lastUpdate: currentDate,
      });

      this.logger.debug(`New stock created: ${newStock}`);

      return newStock;
    
  }

  async deleteStock( stockId: string
    ){
    
    const stock =  await this.stockModel.findByIdAndDelete(new ObjectId(stockId))

    if( !stock ) throw new Error("stock not Found")

    
    return `The stock has been successfully deleted`
  }

  async findAllStocks(): Promise<Partial<StockModel>[]> {
    try {
      const NameAndIdStocks = await this.stockModel.find(
        {},
        '_id name lastUpdate',
      );
      return NameAndIdStocks;
    } catch (error) {
      throw error;
    }
  }
  async findStockById(stockId:string):Promise<StockModel>{

    const stock = await this.stockModel.findById(new ObjectId(stockId));



    return stock
  }

  async createNewItem(
    stockId: string,
    createItemDto: CreateItemDto,
    user: User,
  ): Promise<StockModel | string[]> {
    const stock = await this.stockModel.findById(new ObjectId(stockId));

    if (!stock) {
      throw new Error('Stock not found');
    }

    const isValidatedModel = validateStockModel(
      createItemDto.item,
      stock.itemModel, 
    );

    if (isValidatedModel !== true) { 
      return isValidatedModel;
    }
    //it add the new item
    stock.items.push(createItemDto.item);
    //Add a id for the new item, if this is the first item the id will be = 0
    stock.items.length != 1
      ? (stock.items[stock.items.length - 1].id =
          stock.items[stock.items.length - 2].id + 1)
      : (stock.items[stock.items.length - 1].id = 0);
    //add a new data updated
    const currentDate = new Date().toString();
    stock.lastUpdate = currentDate + `by ${user.name}`;
    //save to the database
    const updatedStock = await stock.save();
    //return the object
    return updatedStock.toObject();
  }

  async modifyItems(
    stockId: string,
    itemId: number,
    updateItem: object,
    user: User | undefined,
  ): Promise<StockModel | string[]> {
    const stock = await this.stockModel.findById(new ObjectId(stockId));

    if (!stock) {
      throw new Error('Stock not found');
    }
    const index = stock.items.findIndex((item) => Number(item.id) === Number(itemId));

    if (index === -1) {
      throw new Error(`Item with id ${itemId} not found in stock`);
    }
    const isValidatedModel = validateStockModel(updateItem, stock.itemModel);
    if (isValidatedModel !== true) {
      return isValidatedModel;
    }
    //update the item
    stock.items[index] = {
      ...updateItem, 
      id: itemId,
    };
    //add a new data updated
    const currentDate = new Date().toString();
    stock.lastUpdate = currentDate + `by ${user.name}`;
    //save to the database
    const updatedStock = await stock.save();
    //return the object
    return updatedStock.toObject();
  }

  async deleteItem(stockId: string,
   itemId: number,
  user: User | undefined){
    try{
    const stock = await this.stockModel.findById(new ObjectId(stockId));

    if (!stock) {
      throw new Error('Stock not found');
    }
    const index = stock.items.findIndex((item) => Number(item.id) === Number(itemId));



    if (index === -1) {
      throw Error(`Item with id ${itemId} not found in stock id: ${stockId}`);

    }
    this.logger.debug(stock)
    stock.items.splice(index,1)
    //add a new data updated
    const currentDate = new Date().toString();
    stock.lastUpdate = currentDate + `by ${user.name}`;
    //save to the database
    const updatedStock =  await stock.save();
    
    //return the object
    return updatedStock;
  }catch(error){
    this.logger.error(`Error deleting item: ${error.message}`);
    throw error;
  }
  
  }
}
