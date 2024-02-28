import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CartEntity, ProductEntity]),
    ProductEntity,
  ],
})
export class CartModule {}
