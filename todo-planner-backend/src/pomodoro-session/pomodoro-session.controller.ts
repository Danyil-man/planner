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
import { PomodoroSessionService } from './pomodoro-session.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { IUser } from 'src/users/types';
import { PomodoroSessionDto } from './dto/pomodoro-session.dto';

@Controller('pomodoro-session')
export class PomodoroSessionController {
  constructor(
    private readonly pomodoroSessionService: PomodoroSessionService,
  ) {}

  @Get('today')
  @Auth()
  async getTodaySession(@CurrentUser() currentUser: IUser) {
    return this.pomodoroSessionService.getTodaySession(currentUser._id);
  }

  @Post()
  @Auth()
  @HttpCode(200)
  async create(@CurrentUser() currentUser: IUser) {
    return this.pomodoroSessionService.create(currentUser._id);
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(
    @Body() dto: PomodoroSessionDto,
    @CurrentUser() currentUser: IUser,
    @Param('id') id: string,
  ) {
    return this.pomodoroSessionService.update(dto, id, currentUser._id);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(200)
  async remove(@Param('id') id: string, @CurrentUser() currentUser: IUser) {
    return this.pomodoroSessionService.remove(id, currentUser._id);
  }
}
