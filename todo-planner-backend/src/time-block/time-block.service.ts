import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimeBlock, TimeBlockDocument } from './entities/time-block.entity';
import { Model, Types } from 'mongoose';
import { TimeBlockDto } from './dto/time-block.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TimeBlockService {
  constructor(
    @InjectModel(TimeBlock.name)
    private timeBlockModel: Model<TimeBlockDocument>,
    private userService: UsersService,
  ) {}

  async create(dto: TimeBlockDto, userId: string | Types.ObjectId) {
    const timeBlockDto = {
      ...dto,
      user_id: userId,
    };

    const newTimeBlock = await this.timeBlockModel.create(timeBlockDto);
    await this.userService.addTimeBlockToUserTimeBlocks(
      newTimeBlock._id,
      userId,
    );

    return newTimeBlock;
  }

  async update(
    dto: Partial<TimeBlockDto>,
    timeBlockId: string,
    userId: string | Types.ObjectId,
  ) {
    return await this.timeBlockModel.findOneAndUpdate(
      { _id: timeBlockId, user_id: userId },
      dto,
      { new: true },
    );
  }

  async getAll(userId: string | Types.ObjectId) {
    const timeBlocks = await this.timeBlockModel
      .find({ user_id: userId })
      .sort({ order: 1 })
      .lean();

    return timeBlocks;
  }

  async remove(timeBlockId: string, userId: string | Types.ObjectId) {
    const timeBlock = await this.timeBlockModel.findById(timeBlockId);
    if (!timeBlock) {
      throw new NotFoundException('Time block not found');
    }

    if (timeBlock.user_id.toString() !== userId.toString()) {
      throw new BadRequestException('User is not the owner of the time block');
    }

    await this.userService.removeTimeBlockFromUserTimeBlocks(
      timeBlockId,
      userId,
    );
    await this.timeBlockModel.findByIdAndDelete(timeBlockId);
  }

  async updateOrder(ids: string[]) {
    const updatedTimeBlocks = [];

    for (const [idx, id] of ids.entries()) {
      try {
        const updatedTimeBlock = await this.timeBlockModel.findOneAndUpdate(
          { _id: id },
          { $set: { order: idx } },
          { new: true },
        );
        updatedTimeBlocks.push(updatedTimeBlock);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: any) {
        throw new BadRequestException(
          'Something went wrong with updating time blocks order',
        );
      }
    }

    return updatedTimeBlocks;
  }
}
