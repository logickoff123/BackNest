import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ApiHideProperty()
  @ManyToOne(() => CartEntity, (cart) => cart.products)
  cart: CartEntity;

  @Column()
  price: number;
}
