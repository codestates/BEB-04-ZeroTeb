import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NonceSchema } from './schemas/token.schema';
import { HoldingSchema } from './schemas/holding.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Nonce', schema: NonceSchema },
      { name: 'Holding', schema: HoldingSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
