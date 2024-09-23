import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';
import { UserDto } from './dto/user.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => TasksService)) private taskService: TasksService,
  ) {}

  async create(authDto: AuthDto) {
    const user = {
      email: authDto.email,
      name: '',
      password: await hash(authDto.password),
    };

    return await this.userModel.create(user);
  }

  async update(id: string | Types.ObjectId, userDto: UserDto) {
    let data = userDto;

    if (userDto.password) {
      data = { ...userDto, password: await hash(userDto.password) };
    }

    return await this.userModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .select('email name');
  }

  async getById(id: string | Types.ObjectId) {
    const user = await this.userModel.findById(id);
    return user?.toObject();
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user?.toObject();
  }

  async getProfile(id: string | Types.ObjectId) {
    const profile = await this.getById(id);

    const totalTasks = profile.tasks.length;
    const completedTasks = await this.taskService.getUserTasks({
      user_id: id,
      isCompleted: true,
    });

    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.taskService.getUserTasks({
      user_id: id,
      createdAt: { $gte: todayStart.toISOString() },
    });

    const weekTasks = await this.taskService.getUserTasks({
      user_id: id,
      createdAt: { $lte: weekStart.toISOString() },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = profile;

    return {
      user: userData,
      statistics: [
        { label: 'Total', value: totalTasks },
        { label: 'Completed tasks', value: completedTasks },
        { label: 'Today tasks', value: todayTasks },
        { label: 'Week tasks', value: weekTasks },
      ],
    };
  }

  async addTaskToUserTasks(
    taskId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { tasks: taskId } },
      { new: true },
    );
  }

  async removeTaskFromUserTasks(
    taskId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    const taskObjectId = new Types.ObjectId(taskId);

    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { tasks: taskObjectId } },
      { new: true },
    );
  }

  async addTimeBlockToUserTimeBlocks(
    timeBlockId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { timeBlocks: timeBlockId } },
      { new: true },
    );
  }

  async removeTimeBlockFromUserTimeBlocks(
    timeBlockId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    const timeBlockObjectId = new Types.ObjectId(timeBlockId);

    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { timeBlocks: timeBlockObjectId } },
      { new: true },
    );
  }

  async getUserIntervals(userId: string | Types.ObjectId) {
    return await this.userModel
      .findOne({ _id: userId })
      .select('intervalsCount');
  }

  async addTPomodoroSessionToUserPomodoroSessions(
    pomodoroSessionId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { pomodoroSessions: pomodoroSessionId } },
      { new: true },
    );
  }

  async removePomodoroSessionFromUserPomodoroSessions(
    pomodoroSessionId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    const pomodoroSessionObjectId = new Types.ObjectId(pomodoroSessionId);

    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { pomodoroSessions: pomodoroSessionObjectId } },
      { new: true },
    );
  }
}
