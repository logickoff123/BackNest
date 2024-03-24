import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { UpdateCartDto } from 'src/cart/dto/update-cart.dto';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async getUserCart(userId: number): Promise<Cart[]> {
    const options: FindManyOptions<Cart> = {
      where: { userId: userId },
    };
    return this.cartRepository.find(options);
  }

  async addToCart(createCartDto: CreateCartDto): Promise<Cart> {
    const newCartItem = this.cartRepository.create(createCartDto);
    return this.cartRepository.save(newCartItem);
  }

  async updateCart(
    cartId: number,
    updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne(cartId);
    if (!cartItem) {
      //
    }
    //
    this.cartRepository.merge(cartItem, updateCartDto);
    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(cartId: number): Promise<void> {
    await this.cartRepository.delete(cartId);
  }
}
