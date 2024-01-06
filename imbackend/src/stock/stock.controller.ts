import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto, StockItemModel } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { StockModel } from './models/StockModel';
import { StockItem } from './entities/stock.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { IsAdmin } from 'src/auth/decorators/IsAdmin.decorator';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  createNewStock(
    @Body() createStockDto: CreateStockDto,
    @IsAdmin() isAdmin:boolean,

    ) {
      return this.stockService.createNewStock(createStockDto,isAdmin);
    }
    
    @Delete('deleteStock/:stockId')
    deleteStock(
    @IsAdmin() isAdmin:boolean,
    @Param('stockId') stockId: string,
    @CurrentUser() user: User | undefined
  ) {
    return this.stockService.deleteStock(stockId,user,isAdmin) 
  }
  @Get('Stocks')
  findAllStocks() {
    return this.stockService.findAllStocks();
  }

  @Patch('createItem/:id')
  createNewItem(
    @Param('id') id: string,
    @Body() createItemDto: CreateItemDto,
    @CurrentUser() user: User | undefined
  ) { 
    return this.stockService.createNewItem(id, createItemDto,user);
  }
  @Patch('modifyItem/:stockId/:itemId')
  modifyItems(
    @Param('stockId') stockId: string,
    @Param('itemId') itemId: number,
    @Body() updateItem: object,
    @CurrentUser() user: User | undefined
  ) {
    return this.stockService.modifyItems(stockId,itemId,updateItem,user);
  }
  @Patch('deleteItem/:stockId/:itemId')
  deleteItem(
    @Param('stockId') stockId: string,
    @Param('itemId') itemId: number,
    @CurrentUser() user: User | undefined
  ) {
    return this.stockService.deleteItem(stockId,itemId,user)
  }
}
