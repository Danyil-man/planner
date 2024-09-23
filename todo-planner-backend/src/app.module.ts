import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/entities/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { TaskSchema } from './tasks/entities/task.entity';
import { TimeBlockModule } from './time-block/time-block.module';
import { TimeBlockSchema } from './time-block/entities/time-block.entity';
import { PomodoroSessionModule } from './pomodoro-session/pomodoro-session.module';
import { PomodoroSessionSchema } from './pomodoro-session/entities/pomodoro-session.entity';
import { PomodoroRoundModule } from './pomodoro-round/pomodoro-round.module';
import { PomodoroRoundSchema } from './pomodoro-round/entities/pomodoro-round.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Task', schema: TaskSchema },
      { name: 'TimeBlock', schema: TimeBlockSchema },
      { name: 'PomodoroSession', schema: PomodoroSessionSchema },
      { name: 'PomodoroRound', schema: PomodoroRoundSchema },
    ]),
    UsersModule,
    TasksModule,
    TimeBlockModule,
    PomodoroSessionModule,
    PomodoroRoundModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
