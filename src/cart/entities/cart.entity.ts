import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiHideProperty()
  @OneToMany(() => ProductEntity, (product) => product.cart)
  products: ProductEntity[];

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
