import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NonceSchema } from './schemas/token.schema';
import { HoldingSchema } from './schemas/holding.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { EventStatus, EventStatusSchema } from 'src/event/schemas/event-status.schema';
import { Participant, ParticipantSchema } from './schemas/participant.schema';
import { EventSchema } from 'src/event/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Nonce', schema: NonceSchema },
      { name: 'Holding', schema: HoldingSchema },
      { name: 'Event', schema: EventSchema },
      { name: EventStatus.name, schema: EventStatusSchema },
      { name: Participant.name, schema: ParticipantSchema },
    ]),
    ScheduleModule.forRoot(),
    AuthModule,
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
