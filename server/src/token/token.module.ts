import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NonceSchema } from './schemas/token.schema';
import { HoldingSchema } from './schemas/holding.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Nonce', schema: NonceSchema },
      { name: 'Holding', schema: HoldingSchema },
    ]),
    ScheduleModule.forRoot(),
    AuthModule,
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
