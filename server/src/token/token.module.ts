import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NonceSchema } from './schemas/token.schema';
import { HoldingSchema } from './schemas/holding.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Nonce', schema: NonceSchema },
      { name: 'Holding', schema: HoldingSchema },
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
