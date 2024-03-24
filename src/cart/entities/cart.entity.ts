import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.carts)
  product: ProductEntity;
}
