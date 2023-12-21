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

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  createNewStock(
    @Body() createStockDto: CreateStockDto,
    @CurrentUser() user: User | undefined,
  ) {
    return this.stockService.createNewStock(createStockDto, user);
  }

  @Get('Stocks')
  findAllStocks() {
    return this.stockService.findAllStocks();
  } 

  @Patch(':id/createItem',)
  createNewItem(@Param("id") id:string,@Body() updateStockDto:UpdateStockDto): Promise<StockModel> {
    return this.stockService.createNewItem(id,updateStockDto)
  }
  @Patch()
  modifyItems() {
    return this.stockService.modifyItems()
  }
}
