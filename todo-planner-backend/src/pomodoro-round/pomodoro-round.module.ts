import { Module } from '@nestjs/common';
import { PomodoroRoundService } from './pomodoro-round.service';
import { PomodoroRoundController } from './pomodoro-round.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PomodoroRound,
  PomodoroRoundSchema,
} from './entities/pomodoro-round.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PomodoroRound.name, schema: PomodoroRoundSchema },
    ]),
  ],
  controllers: [PomodoroRoundController],
  providers: [PomodoroRoundService],
  exports: [PomodoroRoundService, MongooseModule],
})
export class PomodoroRoundModule {}
