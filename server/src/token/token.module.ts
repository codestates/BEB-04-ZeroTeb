import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NonceSchema } from './schemas/token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Nonce', schema: NonceSchema }])],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}