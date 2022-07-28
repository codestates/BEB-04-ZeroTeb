import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { KlaytnModule } from './klaytn/klaytn.module';
import { FileModule } from './common/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.u22wt11.mongodb.net/?retryWrites=true&w=majority`,
    ),
    EventModule,
    TokenModule,
    AuthModule,
    KlaytnModule.forRoot(),
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
