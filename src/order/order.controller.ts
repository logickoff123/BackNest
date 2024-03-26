// import {
//   Controller,
//   Get,
//   Post,
//   Param,
//   Body,
//   Req,
//   UseGuards,
// } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { OrderEntity } from './entities/order.entity';
// import {
//   ApiBearerAuth,
//   ApiBody,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

// @ApiTags('orders')
// @Controller('orders')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post()
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ summary: 'Create a new order' })
//   @ApiBody({ type: OrderEntity })
//   @ApiResponse({
//     status: 201,
//     description: 'The order has been successfully created',
//   })
//   async createOrder(
//     @Req() req,
//     @Body('floor,fullname,phone,email,city,street, apartment,entrance,intercom')
//     floor: string,
//     fullname: string,
//     phone: string,
//     email: string,
//     city: string,
//     street: string,
//     apartment: string,
//     entrance: string,
//     intercom: string,
//   ): Promise<OrderEntity> {
//     const { id } = req.user;
//     return this.orderService.createOrder(
//       id,
//       floor,
//       fullname,
//       phone,
//       email,
//       city,
//       street,
//       apartment,
//       entrance,
//       intercom,
//     );
//   }

//   @Get(':id')
//   async getOrderById(@Param('id') id: number): Promise<OrderEntity> {
//     return this.orderService.getOrderById(id);
//   }
// }
