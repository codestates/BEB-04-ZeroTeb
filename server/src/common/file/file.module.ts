import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

import * as fs from 'fs';

const BASE_FILE_PATH = process.env.BASE_FILE_PATH ?? '/app/static';

@Module({
  imports: [
    // ConfigService 를 inject 하기 위해
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        storage: diskStorage({
          destination: function (req, file, callback) {
            const dest = `${BASE_FILE_PATH}/`;
            if (file.size > 5e7) {
              callback(new Error('50Mb를 초과했습니다.'), '');
              return;
            }
            if (!fs.existsSync(dest)) {
              fs.mkdirSync(dest, { recursive: true });
            }
            if (file.mimetype.match(/\/(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF)$/)) {
              callback(null, dest);
            } else {
              callback(new Error('지원하지 않는 이미지 형식입니다.'), '');
            }
          },
          filename: (req, file, callback) => {
            // 업로드 후 저장되는 파일명을 uuid로 업로드
            return callback(null, `${uuid()}${extname(file.originalname)}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
