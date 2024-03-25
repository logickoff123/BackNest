import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdatecartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get('totalPrice')
  async calculateTotalPrice(): Promise<number> {
    return this.cartService.calculateTotalPrice();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecartDto: UpdatecartDto) {
    return this.cartService.update(+id, updatecartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
