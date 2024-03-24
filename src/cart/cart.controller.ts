import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { UpdateCartDto } from 'src/cart/dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getUserCart(@Param('userId') userId: number): Promise<Cart[]> {
    return this.cartService.getUserCart(userId);
  }

  @Post()
  addToCart(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.addToCart(createCartDto);
  }

  @Put(':cartId')
  updateCart(
    @Param('cartId') cartId: number,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return this.cartService.updateCart(cartId, updateCartDto);
  }

  @Delete(':cartId')
  removeFromCart(@Param('cartId') cartId: number): Promise<void> {
    return this.cartService.removeFromCart(cartId);
  }
}
