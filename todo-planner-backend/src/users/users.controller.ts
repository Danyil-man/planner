import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { IUser } from './types';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user/profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth()
  async profile(@CurrentUser() currentUser: IUser) {
    return this.usersService.getProfile(currentUser._id);
  }

  @Put()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateProfile(@CurrentUser() currentUser: IUser, @Body() dto: UserDto) {
    return this.usersService.update(currentUser._id, dto);
  }
}
