import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  totalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
