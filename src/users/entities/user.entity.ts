import { Basket } from 'src/basket/entities/basket.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  OneToOne,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Order, (order) => order.user)
  order: Order;

  @OneToOne(() => Basket, (basket) => basket.user)
  basket: Basket;
}
