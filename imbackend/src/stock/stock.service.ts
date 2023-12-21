import { Injectable, Logger } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockModel } from './models/StockModel';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stock, StockItem } from './entities/stock.entity';
import { User } from 'src/user/entities/user.entity';

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

 async createNewItem(stockId: string, newItem: StockItem): Promise<StockModel> {
    const stock = await this.stockModel.findById(stockId)


    const updatedStock = await stock.save();
  this.logger.debug(`Item added to stock: ${newItem}`);

  return updatedStock.toObject()
  }

  modifyItems() {}
}
