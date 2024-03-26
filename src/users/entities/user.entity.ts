import { Basket } from 'src/basket/entities/basket.entity';
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
  cart: any;
  orders: any;
  @OneToOne(() => Basket, (basket) => basket.user)
  basket: Basket;
}
