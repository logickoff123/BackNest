import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Basket } from './entities/basket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBasketDto } from './dto/create-basket.dto';
import { ProductService } from 'src/product/product.service';
import { BasketItemEntity } from './entities/basket-item.entity';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(BasketItemEntity)
    private readonly basketItemRepository: Repository<BasketItemEntity>,
    private readonly productService: ProductService,
  ) {}

  async create(user: UserEntity): Promise<Basket> {
    const basket = new Basket();
    basket.user = user;
    await this.basketRepository.save(basket);
    return basket;
  }
  // async getItemsByUserId(userId: number): Promise<BasketItemEntity> {
  //   const basket = await this.basketRepository.findOne({ where: { userId } });
  //   return basket.items;
  // }

  async get(userId: number): Promise<number> {
    const basket = await this.basketRepository.findOne({
      where: { user: { id: userId } },
      relations: ['basketItems', 'basketItems.product'],
    });

    if (!basket) {
      throw new NotFoundException(
        'Невозможно найти корзину с таким id: ' + userId,
      );
    }

    return basket.getTotalPrice();
  }

  async CreateBasketItemDto(dto: CreateBasketDto, user: any) {
    const product = await this.productService.findOne(dto.productId);

    if (!product) {
      throw new NotFoundException(
        'Не нашлось продукта с таким id: ' + dto.productId,
      );
    }

    const userBasket = await this.basketRepository.findOne({
      relations: {
        BasketItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    // Вывод заголовка
    // Проверка на существование товара в корзине если да, то добавить, если нет вывести новый
    if (userBasket.BasketItems.some((x) => x.product.id == product.id)) {
      const cItem = userBasket.BasketItems.find(
        (x) => x.product.id == product.id,
      );
      cItem.Count += +dto.count;
      return await this.basketItemRepository.save(cItem);
    }

    const basketItem = this.basketItemRepository.create({
      product: product,
      Count: +dto.count,
    });
    basketItem.basketPrice = product.price * dto.count;
    basketItem.basket = userBasket;
    return await this.basketItemRepository.save(basketItem);
  }

  async findAll(user: any) {
    const userBasket = await this.basketRepository.findOne({
      relations: {
        BasketItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });
    return userBasket.BasketItems;
  }

  async findOne(productId: number, user: any) {
    const userBasket = await this.basketRepository.findOne({
      relations: {
        BasketItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    const product = userBasket.BasketItems.find((x) => x.id == productId);

    if (!product) {
      throw new NotFoundException('Данный товар не найлен по id: ' + productId);
    }

    return product;
  }

  async update(dto: UpdateBasketDto, user: any) {
    const userBasket = await this.basketRepository.findOne({
      relations: {
        BasketItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    const basketItem = await this.basketItemRepository.findOne({
      relations: {
        basket: true,
        product: true,
      },
      where: {
        product: await this.productService.findOne(dto.productId),
        basket: userBasket,
      },
    });

    if (!basketItem) {
      throw new NotFoundException(
        'Товар с таким id не найден: ' + dto.productId,
      );
    }

    basketItem.Count = dto.count;
    if (basketItem.Count == 0) {
      return await this.basketItemRepository.remove(basketItem);
    }
    return await this.basketItemRepository.save(basketItem);
  }

  async remove(productId: number, user: any): Promise<DeleteResult> {
    const userBasket = await this.basketRepository.findOne({
      relations: {
        BasketItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    const basketItem = await this.basketItemRepository.findOne({
      relations: {
        basket: true,
        product: true,
      },
      where: {
        product: await this.productService.findOne(productId),
        basket: userBasket,
      },
    });

    if (!BasketItemEntity) {
      throw new NotFoundException('Не нашлось товара с таким id: ' + productId);
    }

    return await this.basketItemRepository.delete(basketItem);
  }

  async removeBasket(user: any): Promise<DeleteResult> {
    const userBasket = await this.basketRepository.findOne({
      relations: {
        BasketItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    if (!userBasket) {
      throw new NotFoundException();
    }

    await this.basketItemRepository
      .createQueryBuilder()
      .delete()
      .where('basketId = :basketId', { basketId: userBasket.id })
      .execute();

    userBasket.BasketItems = [];
    await this.basketRepository.save(userBasket);

    return await this.basketRepository.delete(userBasket.id);
  }
  async getUserBasket(user: any) {
    const userBasket = await this.basketRepository.findOne({
      relations: {
        BasketItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });
    return userBasket;
  }
  // async remove(user: any) {
  //   this.basketRepository.delete(user.id);
  // }
}
