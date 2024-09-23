import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task, TaskDocument } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CountQueryDto } from './dto/countQuery.dto';
import { TaskDto } from './dto/task.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
  ) {}

  async create(dto: TaskDto, userId: string | Types.ObjectId) {
    const taskDto = {
      ...dto,
      user_id: userId,
    };

    const newTask = await this.taskModel.create(taskDto);
    await this.userService.addTaskToUserTasks(newTask._id, userId);

    return newTask;
  }

  async update(
    dto: Partial<TaskDto>,
    taskId: string,
    userId: string | Types.ObjectId,
  ) {
    return await this.taskModel.findOneAndUpdate(
      { _id: taskId, user_id: userId },
      dto,
      { new: true },
    );
  }

  async getUserTasks(query: CountQueryDto) {
    const totalCompletedTasks = await this.taskModel.countDocuments(query);
    return totalCompletedTasks;
  }

  async getAll(userId: string | Types.ObjectId) {
    const userTasks = await this.taskModel.find({ user_id: userId }).lean();
    return userTasks;
  }

  async remove(taskId: string, userId: string | Types.ObjectId) {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.user_id.toString() !== userId.toString()) {
      throw new BadRequestException('User is not the owner of the task');
    }

    await this.userService.removeTaskFromUserTasks(taskId, userId);
    await this.taskModel.findByIdAndDelete(taskId);
  }
}
