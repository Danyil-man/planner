import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { IUser } from 'src/users/types';
import { TimeBlockDto } from './dto/time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('user/time-blocks')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser() currentUser: IUser) {
    return this.timeBlockService.getAll(currentUser._id);
  }

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async create(@Body() dto: TimeBlockDto, @CurrentUser() currentUser: IUser) {
    return this.timeBlockService.create(dto, currentUser._id);
  }

  @Put('update-order')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return this.timeBlockService.updateOrder(updateOrderDto.ids);
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(
    @Body() dto: TimeBlockDto,
    @CurrentUser() currentUser: IUser,
    @Param('id') id: string,
  ) {
    return this.timeBlockService.update(dto, id, currentUser._id);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(200)
  async remove(@CurrentUser() currentUser: IUser, @Param('id') id: string) {
    return this.timeBlockService.remove(id, currentUser._id);
  }
}
