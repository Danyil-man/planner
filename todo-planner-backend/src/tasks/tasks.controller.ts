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
import { TasksService } from './tasks.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { IUser } from 'src/users/types';
import { TaskDto } from './dto/task.dto';

@Controller('user/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser() currentUser: IUser) {
    return this.tasksService.getAll(currentUser._id);
  }

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async create(@Body() dto: TaskDto, @CurrentUser() currentUser: IUser) {
    return this.tasksService.create(dto, currentUser._id);
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(
    @Body() dto: TaskDto,
    @CurrentUser() currentUser: IUser,
    @Param('id') id: string,
  ) {
    return this.tasksService.update(dto, id, currentUser._id);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(200)
  async remove(@Param('id') id: string, @CurrentUser() currentUser: IUser) {
    return this.tasksService.remove(id, currentUser._id);
  }
}
