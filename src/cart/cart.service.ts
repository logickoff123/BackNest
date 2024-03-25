import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdatecartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateCartDto) {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new BadRequestException(`Продукт с id=${dto.productId} не найден`);
    }

    const cart = new CartEntity();
    cart.productId = dto.productId;
    cart.quantity = dto.quantity;
    cart.price = product.price; // Устанавливаем цену из таблицы product_card

    return this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, dto: UpdatecartDto) {
    const toUpdate = await this.cartRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    return this.cartRepository.save(toUpdate);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }

  async calculateTotalPrice(): Promise<number> {
    const cartItems = await this.cartRepository.find();
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      totalPrice += cartItem.price * cartItem.quantity; // Вычисляем общую сумму для каждой записи в корзине
    });

    return totalPrice;
  }
}
