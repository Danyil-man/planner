import { Module } from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { TimeBlockController } from './time-block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeBlock, TimeBlockSchema } from './entities/time-block.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeBlock.name, schema: TimeBlockSchema },
    ]),
    UsersModule,
  ],
  controllers: [TimeBlockController],
  providers: [TimeBlockService],
})
export class TimeBlockModule {}
