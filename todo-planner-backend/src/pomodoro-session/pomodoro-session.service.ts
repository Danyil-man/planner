import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PomodoroSession,
  PomodoroSessionDocument,
} from './entities/pomodoro-session.entity';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { PomodoroRoundService } from 'src/pomodoro-round/pomodoro-round.service';
import { PomodoroSessionDto } from './dto/pomodoro-session.dto';

@Injectable()
export class PomodoroSessionService {
  constructor(
    @InjectModel(PomodoroSession.name)
    private pomodoroSessionModel: Model<PomodoroSessionDocument>,
    private userService: UsersService,
    private pomodoroRoundService: PomodoroRoundService,
  ) {}

  async getTodaySession(userId: string | Types.ObjectId) {
    const today = new Date().toISOString().split('T')[0];

    return await this.pomodoroSessionModel
      .findOne({
        user_id: userId,
        createdAt: { $gte: new Date(today) },
      })
      .populate({
        path: 'rounds',
        model: 'PomodoroRound',
        options: { sort: { _id: 1 } },
      })
      .lean();
  }

  async create(userId: string | Types.ObjectId) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) {
      return todaySession;
    }

    const user = await this.userService.getUserIntervals(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roundsData = Array.from({ length: user.intervalsCount }, () => ({
      totalSeconds: 0,
      isCompleted: false,
    }));

    const mainSession = await this.pomodoroSessionModel.create({
      user_id: userId,
      rounds: [],
    });

    await this.userService.addTPomodoroSessionToUserPomodoroSessions(
      mainSession._id,
      userId,
    );

    const createdRoundsWithSessionId =
      await this.pomodoroRoundService.createRoundsWithSessionId(
        mainSession._id,
        roundsData,
      );

    const updatedPomodoroSession = await this.pomodoroSessionModel
      .findByIdAndUpdate(
        mainSession._id,
        {
          $addToSet: {
            rounds: {
              $each: createdRoundsWithSessionId.map((round) => round._id),
            },
          },
        },
        { new: true },
      )
      .populate({ path: 'rounds', model: 'PomodoroRound' })
      .lean();

    return updatedPomodoroSession;
  }

  async update(
    dto: Partial<PomodoroSessionDto>,
    pomodoroSessionId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    return await this.pomodoroSessionModel.findOneAndUpdate(
      { _id: pomodoroSessionId, user_id: userId },
      dto,
      { new: true },
    );
  }

  async remove(sessionId: string, userId: string | Types.ObjectId) {
    const session = await this.pomodoroSessionModel.findById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.user_id.toString() !== userId.toString()) {
      throw new BadRequestException('User is not the owner of the session');
    }

    await this.userService.removePomodoroSessionFromUserPomodoroSessions(
      sessionId,
      userId,
    );

    await this.pomodoroRoundService.clearPomodoroRounds(sessionId);
    await this.pomodoroSessionModel.findByIdAndDelete(sessionId);
  }
}
