import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EventResultSchema } from './schemas/eventResult.schema';
import { LikedEventSchema } from './schemas/likedEvent.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'EventResult', schema: EventResultSchema },
      { name: 'LikedEvent', schema: LikedEventSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
