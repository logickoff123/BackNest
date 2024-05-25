import { Basket } from 'src/basket/entities/basket.entity';
import { Order } from 'src/order/entities/order.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  OneToOne,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
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
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn()
  role: Role;
}
