import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';

const BASE_FILE_PATH = process.env.BASE_FILE_PATH ?? '/app/static';

@Controller('file')
export class FileController {
  constructor(private config: ConfigService) {}

  // 파일 업로드
  // http://localhost:3000/file
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    const path = file.path.replace(BASE_FILE_PATH, '');

    // 원본파일명과 저장된 파일명을 리턴해서 다운로드 받을때 씀
    return {
      fileName: file.originalname,
      savedPath: path.replace(/\\/gi, '/'),
      size: file.size,
    };
  }

  // 파일 다운로드
  // http://localhost:3000/file/[savedPath]?fn=[fileName]
  // http://localhost:3000/file/202104/12312541515151.xlsx?fn=다운받을원본파일명.xlsx
  @Get()
  async download(@Res() res: Response, @Query('fn') fileName: string) {
    console.log(`${BASE_FILE_PATH}/` + fileName);
    res.download(`${BASE_FILE_PATH}/` + fileName);
  }
}
