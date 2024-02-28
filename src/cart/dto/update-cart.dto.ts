import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
