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

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(@InjectModel(Stock.name) private stockModel: Model<StockModel>) {}

  async createNewStock(
    createStockDto: CreateStockDto,
    user: User,
  ): Promise<StockModel> {
    const currentDate = new Date().toString();
    if (user.isAdmin) {
      const newStock = await this.stockModel.create({
        ...createStockDto,
        items: [],
        lastUpdate: currentDate,
      });

      this.logger.debug(`New stock created: ${newStock}`);

      return newStock;
    } else {
      throw new Error('The User is not an admin');
    }
  }

  async findAllStocks(): Promise<Partial<StockModel>[]> {
    try {
      const NameAndIdStocks = await this.stockModel.find(
        {},
        '_id name lastUpdate',
      );
      this.logger.debug(`Stocks: ${NameAndIdStocks}`);
      return NameAndIdStocks;
    } catch (error) {
      this.logger.error(`Error retrieving the stocks: ${error.message}`);
      throw error;
    }
  }
  validateStockModel(item: object, itemModel: StockItemModel[]): boolean | string[] {
    const CopiedModel = [...itemModel];
    const copiedItem = { ...item };
    const errors: string[] = [];
  
    CopiedModel.forEach((e,i) => {
      if (!(e.key in item)) {
        errors.push(`should have ${e.key} in Item`);
      } else {
        delete copiedItem[e.key];
        delete CopiedModel[i];
        if (typeof item[e.key] != e.type) {
        errors.push(`the type in ${e.key} is different from ModelType, it needs to be a ${e.type}`);
      } }
      
    });
  
    if (Object.keys(copiedItem).length !== 0) {
      errors.push(`shouldn't have these items: ${Object.keys(copiedItem).join(', ')}`);
    }
  
    if (errors.length !== 0) {
      return errors;
    }


  
  
    return true;
  }
  
  async createNewItem(
    stockId: string,
    createItemDto: CreateItemDto,
  ): Promise<StockModel> {
    const stock = await this.stockModel.findById(new ObjectId(stockId));

    if (!stock) {
      throw new Error('Stock not found');
    }

    const isValidatedModel = this.validateStockModel(
      createItemDto.item,
      stock.itemModel,
    );

    this.logger.debug(isValidatedModel)

    const updatedStock = await stock;
    this.logger.debug(`Item added to stock: ${createItemDto}`);

    return updatedStock.toObject();
  }

  modifyItems() {}
}
