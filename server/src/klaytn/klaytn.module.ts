import Caver, { HttpProviderOptions } from 'caver-js';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { KlaytnService } from './klaytn.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

const option: HttpProviderOptions = {
  headers: [
    {
      name: 'Authorization',
      value:
        'Basic ' +
        Buffer.from(
          process.env.KAS_ACCESS_KEY_ID + ':' + process.env.KAS_SECRET_ACCESS_KEY,
        ).toString('base64'),
    },
    { name: 'x-chain-id', value: '1001' },
  ],
};

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
          useValue: new Caver(
            new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', option),
          ),
        },
        KlaytnService,
      ],
      exports: [KlaytnService],
    };
  }
}
