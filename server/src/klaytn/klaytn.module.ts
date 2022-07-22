import Caver from 'caver-js';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { KlaytnService } from './klaytn.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
@Global()
export class KlaytnModule {
  static forRoot(): DynamicModule {
    return {
      module: KlaytnModule,
      providers: [
        {
          provide: 'Klaytn',
          useValue: new Caver('https://api.baobab.klaytn.net:8651/'),
        },
        KlaytnService,
      ],
      exports: [KlaytnService],
    };
  }
}
