import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EventResultSchema } from './schemas/eventResult.schema';
import { LikedEventSchema } from './schemas/likedEvent.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { EventStatus, EventStatusSchema } from './schemas/event-status.schema';
import { HoldingSchema } from 'src/token/schemas/holding.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'EventResult', schema: EventResultSchema },
      { name: 'LikedEvent', schema: LikedEventSchema },
      { name: User.name, schema: UserSchema },
      { name: EventStatus.name, schema: EventStatusSchema },
      { name: 'Holding', schema: HoldingSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
