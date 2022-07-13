import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EventResultSchema } from './schemas/eventResult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'EventResult', schema: EventResultSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
