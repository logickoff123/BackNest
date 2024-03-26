import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async createOrder(
    id: number,
    floor: string,
    fullname: string,
    phone: string,
    email: string,
    city: string,
    street: string,
    apartment: string,
    entrance: string,
    intercom: string,
  ): Promise<OrderEntity> {
    const cartItems = await this.cartRepository.find();
    const cartProducts = cartItems.map((cartItem) =>
      cartItem.productId.toString(),
    );

    const newOrder = new OrderEntity();
    newOrder.products = cartProducts.join(', ');
    newOrder.floor = floor;
    newOrder.fullname = fullname;
    newOrder.phone = phone;
    newOrder.email = email;
    newOrder.city = city;
    newOrder.street = street;
    newOrder.apartment = apartment;
    newOrder.entrance = entrance;
    newOrder.intercom = intercom;
    newOrder.userId = id;

    return await this.orderRepository.save(newOrder);
  }

  async getOrderById(id: number): Promise<OrderEntity> {
    return this.orderRepository.findOne({
      where: { id },
    });
  }
}
