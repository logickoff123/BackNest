import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { BasketItemEntity } from 'src/basket/entities/basket-item.entity';

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

  @Column()
  price: number;

  @ApiHideProperty()
  @OneToMany(() => BasketItemEntity, (basket) => basket.product)
  basket: BasketItemEntity[];
}
