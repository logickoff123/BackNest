import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { BasketModule } from 'src/basket/basket.module';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [
    ConfigModule,
    BasketModule,
    TypeOrmModule.forFeature([UserEntity, Role]),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
