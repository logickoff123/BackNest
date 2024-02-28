import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
    const cart = new CartEntity();
    cart.quantity = dto.quantity;

    const newCart = await this.cartRepository.save(cart);

    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
      relations: ['carts'],
    });

    product.carts.push(cart);

    await this.productRepository.save(product);

    return newCart;
  }

  async findAll() {
    return this.cartRepository.find();
  }

  async findOne(id: number) {
    return this.cartRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCartDto) {
    const toUpdate = await this.cartRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.quantity) {
      toUpdate.quantity = dto.quantity;
    }
    return this.cartRepository.save(toUpdate);
  }

  async remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
