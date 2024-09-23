import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PomodoroRoundService } from './pomodoro-round.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PomodoroRoundDto } from './dto/pomodoro-round.dto';

@Controller('pomodoro-round')
export class PomodoroRoundController {
  constructor(private readonly pomodoroRoundService: PomodoroRoundService) {}

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
    return this.pomodoroRoundService.update(dto, id);
  }
}
