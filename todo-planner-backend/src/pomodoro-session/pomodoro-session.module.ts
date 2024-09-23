import { Module } from '@nestjs/common';
import { PomodoroSessionService } from './pomodoro-session.service';
import { PomodoroSessionController } from './pomodoro-session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PomodoroSession,
  PomodoroSessionSchema,
} from './entities/pomodoro-session.entity';
import { UsersModule } from 'src/users/users.module';
import { PomodoroRoundModule } from 'src/pomodoro-round/pomodoro-round.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PomodoroSession.name, schema: PomodoroSessionSchema },
    ]),
    UsersModule,
    PomodoroRoundModule,
  ],
  controllers: [PomodoroSessionController],
  providers: [PomodoroSessionService],
})
export class PomodoroSessionModule {}
