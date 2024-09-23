import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PomodoroRound,
  PomodoroRoundDocument,
} from './entities/pomodoro-round.entity';
import { Model, Types } from 'mongoose';
import { PomodoroRoundDto } from './dto/pomodoro-round.dto';

@Injectable()
export class PomodoroRoundService {
  constructor(
    @InjectModel(PomodoroRound.name)
    private pomodoroRoundModel: Model<PomodoroRoundDocument>,
  ) {}

  async createRoundsWithSessionId(
    sessionId: string | Types.ObjectId,
    rounds: Array<PomodoroRoundDto>,
  ) {
    const createdRounds = await this.pomodoroRoundModel.insertMany(
      rounds.map((round) => ({ ...round, pomodoro_session_id: sessionId })),
    );
    return createdRounds;
  }

  async update(
    dto: Partial<PomodoroRoundDto>,
    roundId: string | Types.ObjectId,
  ) {
    return await this.pomodoroRoundModel.findOneAndUpdate(
      { _id: roundId },
      dto,
      { new: true },
    );
  }

  async clearPomodoroRounds(sessionId: string | Types.ObjectId) {
    const sessionObjectId = new Types.ObjectId(sessionId);

    return await this.pomodoroRoundModel.deleteMany({
      pomodoro_session_id: sessionObjectId,
    });
  }
}
