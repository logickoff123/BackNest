import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdatecartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() createCartDto: CreateCartDto) {
    const { id } = req.user;
    return this.cartService.create(id, createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get('total-price')
  async getTotalPrice(): Promise<number> {
    return await this.cartService.calculateTotalPrice();
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
