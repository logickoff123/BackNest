import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  totalPrice: number;
}
