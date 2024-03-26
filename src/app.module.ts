import { Module } from '@nestjs/common'; // корневой файл (контролеры провайдеоы)
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/postgress.config';
import { PromoModule } from './promo/promo.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    PromoModule,
    CategoryModule,
    ProductModule,
    UsersModule,
    AuthModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
